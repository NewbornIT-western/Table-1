// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Determines whether a value is an object that is not an array.
 *
 * @param item - The value to test. Note: `null` has `typeof` `'object'` in JavaScript and will cause this function to return `true`.
 * @returns `true` if `typeof item === 'object'` and `item` is not an array, `false` otherwise.
 */
export function isObject(item: unknown): item is object {
  return typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deeply merges properties from `source` into `target`.
 *
 * When both arguments are plain objects (i.e., typeof === "object" and not an array), object-valued properties are merged recursively; non-object values (including arrays) from `source` overwrite `target` properties. The function returns a shallow copy of `target` with merged values applied.
 *
 * @param target - The destination object whose shallow copy will be returned with merged values.
 * @param source - The source object whose properties will be merged into `target`.
 * @returns The merged object (typed as `T`).
 */
export default function deepMerge<T, R>(target: T, source: R): T {
  const output = { ...target }
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = deepMerge(target[key], source[key])
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }

  return output
}