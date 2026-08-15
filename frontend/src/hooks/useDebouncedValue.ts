import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    setTimeout(() => setDebounced(value), delayMs)
  }, [value, delayMs])

  return debounced
}
