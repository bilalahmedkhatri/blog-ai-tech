import { useEffect, useRef } from 'react';

/**
 * Autosaves the given form state to localStorage under keys prefixed by storagePrefix.
 * The save action is debounced using setTimeout to reduce frequent writes.
 *
 * @param {string} storagePrefix - The prefix for the localStorage keys.
 * @param {Object} formState - The form data to autosave.
 * @param {number} delay - (Optional) Debounce delay in milliseconds (default 500ms).
 */
export const useAutosave = (storagePrefix, formState, delay = 500) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear the previous timer if formState changes quickly
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timer for debounced save
    timeoutRef.current = setTimeout(() => {
      Object.entries(formState).forEach(([key, value]) => {
        // Skip saving undefined, null, or empty strings
        if (value === undefined || value === null) return;
        if (typeof value === 'string' && value.trim() === '') return;
        localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(value));
      });
    }, delay);

    // Cleanup timer on unmount or when dependencies change
    return () => clearTimeout(timeoutRef.current);
  }, [formState, storagePrefix, delay]);
};

/**
 * Retrieves autosaved form state from localStorage.
 *
 * @param {string} storagePrefix - The prefix used in localStorage.
 * @param {Array<string>} keys - Array of keys to retrieve.
 * @returns {Object} - The retrieved form state.
 */
export const getAutosavedFormState = (storagePrefix, keys) => {
  const data = {};
  keys.forEach((key) => {
    const saved = localStorage.getItem(`${storagePrefix}${key}`);
    if (saved) {
      try {
        data[key] = JSON.parse(saved);
      } catch (error) {
        data[key] = saved;
      }
    }
  });
  return data;
};
