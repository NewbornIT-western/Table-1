export type Theme = 'dark' | 'light'

export interface ThemeContextType {
  setTheme: (theme: Theme | null) => void
  theme?: Theme | null
}

/**
 * Determines whether a given value is a valid Theme ('dark' or 'light').
 *
 * @param string - The value to validate; may be `null`.
 * @returns `true` if `string` is `'dark'` or `'light'`, `false` otherwise.
 */
export function themeIsValid(string: null | string): string is Theme {
  return string ? ['dark', 'light'].includes(string) : false
}