// Source: https://www.allthingsgym.com/rep-max-calculator/

export type NRepMaxCalculator = (oneRepMax: number, reps: number) => number

function lombardi(oneRepMax: number, reps: number): number {
  return Math.floor(oneRepMax / Math.pow(reps, 1 / 10))
}

function brzycki(oneRepMax: number, reps: number): number {
  return Math.floor((oneRepMax * (37 - reps)) / 36)
}

function epley(oneRepMax: number, reps: number): number {
  return Math.floor(oneRepMax / (1 + reps / 30))
}

function mayhew(oneRepMax: number, reps: number): number {
  return Math.floor((oneRepMax * (52.2 + 41.9 * Math.exp(-1 * (reps * 0.055)))) / 100)
}

function oConner(oneRepMax: number, reps: number): number {
  return Math.floor(oneRepMax / (1 + reps * 0.025))
}

function wathan(oneRepMax: number, reps: number): number {
  return Math.floor((oneRepMax * (48.8 + 53.8 * Math.exp(-1 * (reps * 0.075)))) / 100)
}

function lander(oneRepMax: number, reps: number): number {
  return Math.floor((oneRepMax * (101.3 - 2.67123 * reps)) / 100)
}

function average(oneRepMax: number, reps: number): number {
  const maxes = [
    lombardi(oneRepMax, reps),
    brzycki(oneRepMax, reps),
    epley(oneRepMax, reps),
    mayhew(oneRepMax, reps),
    oConner(oneRepMax, reps),
    wathan(oneRepMax, reps),
    lander(oneRepMax, reps),
  ]
  return maxes.reduce((sum, max) => sum + max, 0) / maxes.length
}

export const NRepMax = {
  lombardi,
  brzycki,
  epley,
  mayhew,
  oConner,
  wathan,
  lander,
  average,
}
