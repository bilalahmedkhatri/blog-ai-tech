import ollama
import httpx
from typing import Optional

def generate_response(
    model: str,
    prompt: str,
    max_tokens: int = 128,
    temperature: float = 0.7,
    system_prompt: Optional[str] = None
) -> str:
    """
    Generates text response using a local Ollama model with robust error handling.

    Args:
        model (str): Name of the installed Ollama model
        prompt (str): Input text for model processing
        max_tokens (int, optional): Maximum response length. Defaults to 128
        temperature (float, optional): Creativity control (0.0-1.0). Defaults to 0.7
        system_prompt (str, optional): System context/instructions for the model

    Returns:
        str: Generated text response

    Raises:
        ConnectionError: When unable to reach Ollama service
        ValueError: For invalid inputs or model not found
        RuntimeError: For generation failures or unexpected errors

    Example:
        >>> try:
        >>>     response = generate_response("llama2", "Explain quantum computing")
        >>> except ValueError as e:
        >>>     print(f"Validation error: {e}")
    """
    # Input validation
    if not isinstance(model, str) or not model.strip():
        raise ValueError("Model name must be a non-empty string")
    
    if not isinstance(prompt, str) or not prompt.strip():
        raise ValueError("Prompt must be a non-empty string")

    try:
        # Configure API request
        options = {
            "num_predict": max_tokens,
            "temperature": temperature,
        }

        # Handle system prompt if provided
        messages = [{"role": "user", "content": prompt}]
        if system_prompt:
            messages.insert(0, {"role": "system", "content": system_prompt})

        # Execute generation request
        response = ollama.chat(
            model=model,
            messages=messages,
            options=options
        )

        return response["message"]["content"]

    except httpx.ConnectError as e:
        raise ConnectionError(
            "Ollama connection failed. Verify service is running "
            "(default: http://localhost:11434) and network connectivity."
        ) from e

    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            available_models = [m["name"] for m in ollama.list().get("models", [])]
            raise ValueError(
                f"Model '{model}' not found. Installed models: {', '.join(available_models)}"
            ) from None
        raise RuntimeError(
            f"API request failed (HTTP {e.response.status_code}): {e.response.text}"
        ) from e

    except KeyError as e:
        raise RuntimeError(
            "Unexpected response format from Ollama API"
        ) from e

    except Exception as e:
        raise RuntimeError(
            f"Text generation failed: {str(e)}"
        ) from e