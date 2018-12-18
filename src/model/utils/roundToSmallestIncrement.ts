export function roundToSmallestIncrement(weight: number, smallestIncrement: number): number {
  const roundedWeight = Math.round(weight)
  if (roundedWeight % smallestIncrement === 0) {
    return roundedWeight
  }
  const fullSmallestPlate = Math.floor(roundedWeight / smallestIncrement)
  const differenceA = roundedWeight - fullSmallestPlate * smallestIncrement
  const differenceB = smallestIncrement - differenceA
  if (differenceA < smallestIncrement / 2) {
    return roundedWeight - differenceA
  } else {
    return roundedWeight + differenceB
  }
}
