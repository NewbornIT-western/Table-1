import { useState, useEffect } from 'react'

/**
 * Provides a debounced version of a value that updates after a specified delay.
 *
 * @param value - The input value to debounce.
 * @param delay - Delay in milliseconds before the returned value updates (default 200).
 * @returns The value delayed by `delay` milliseconds; updates to `value` are reflected after the delay.
 */
export function useDebounce<T>(value: T, delay = 200): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}