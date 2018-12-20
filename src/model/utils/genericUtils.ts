export function range(endExcluse: number): number[] {
  return new Array(endExcluse).fill(null).map((_, index) => index)
}
