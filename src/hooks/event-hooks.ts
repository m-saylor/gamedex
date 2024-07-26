import { useCallback } from 'react';

// key codes
export const ENTER_KEY = 13;

/**
 * @param {function} callback - function to run if the keyCode parameter matches the event keycode
 * @param {number} keyCode - key code that will trigger the function
 * @returns callback function to be used in onKeyDown
 */
export function useOnKeyDown(callback, keyCode) {
  return useCallback((e) => {
    if (e.keyCode === keyCode) {
      callback();
    }
  }, [callback, keyCode]);
}
