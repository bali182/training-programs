// Source: https://www.allthingsgym.com/rep-max-calculator/

export type OneRepMaxCalculator = (weight: number, reps: number) => number

export function lombardi(weight: number, reps: number): number {
  return weight * Math.pow(reps, 1 / 10)
}

export function brzycki(weight: number, reps: number): number {
  return weight * (36 / (37 - reps))
}

export function epley(weight: number, reps: number): number {
  return weight * (1 + reps / 30)
}

export function mayhew(weight: number, reps: number): number {
  return (weight * 100) / (52.2 + 41.9 * Math.exp(-1 * (reps * 0.055)))
}

export function oConner(weight: number, reps: number): number {
  return weight * (1 + reps * 0.025)
}

export function wathan(weight: number, reps: number): number {
  return (weight * 100) / (48.8 + 53.8 * Math.exp(-1 * (reps * 0.075)))
}

export function lander(weight: number, reps: number): number {
  return (weight * 100) / (101.3 - 2.67123 * reps)
}

export function average(weight: number, reps: number): number {
  const maxes = [
    lombardi(weight, reps),
    brzycki(weight, reps),
    epley(weight, reps),
    mayhew(weight, reps),
    oConner(weight, reps),
    wathan(weight, reps),
    lander(weight, reps),
  ]
  return maxes.reduce((sum, max) => sum + max, 0) / maxes.length
}

export const OneRepMax = {
  lombardi,
  brzycki,
  epley,
  mayhew,
  oConner,
  wathan,
  lander,
  average,
}
