from openai import OpenAI
from dotenv import load_dotenv 
import os

load_dotenv()   


client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = os.getenv("NVIDIA_API_KEY")
)

completion = client.chat.completions.create(
  model="nvidia/usdcode-llama-3.1-70b-instruct",
  messages=[{"role":"user","content":"generate reusable class make video from image and videos, dont need to define, path I already created, write the functions in this class, which transition, change clip, zoom in out, left to right and right to left, cropping functionality, and use proper error handling in professional tone, and run them asyncronously in different perellal threads, \n\nif this class work as expected then you next task is generate and AGENT that have these bullet points features:\n> Agent can analyze video, and deside which part of given clip is good fit for video generation  as per given title or descritpion.\n> then pass these paramter or value to subclip funtion to cut\n> add background audio and main audio.\n> create database connection seperately for crud. \n> if possible then try convert to binary or bytes or anyother suitable format to build video or generate on GPU for examaple ( get the final result from moviepy then pass these data to any other library like opencv, pytorch or anyother which have GPU acceleration, also add CPU rendering option if GPU not fount then use CPU ).\n\n"}],
  temperature=0.1,
  top_p=1,
  max_tokens=1024,
  extra_body={"expert_type":"auto"},
  stream=True
)

for chunk in completion:
  if chunk.choices[0].delta.content is not None:
    print(chunk.choices[0].delta.content, end="")

