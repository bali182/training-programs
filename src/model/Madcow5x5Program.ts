import { TrainingProgram, TrainingWeek, WeightUnit, TrainingDay, Exercise, ExerciseType, ExerciseSet } from './typings'
import { roundToSmallestIncrement } from './utils/roundToSmallestIncrement'
import { range } from './utils/genericUtils'
import { NRepMax } from './utils/NRepMaxCalculators'

export type Madcow5x5Config = Readonly<{
  weightUnit: WeightUnit
  rampingPercentage: number
  smallestIncrement: number
  [ExerciseType.SQUAT]: number
  [ExerciseType.BENCH_PRESS]: number
  [ExerciseType.DEADLIFT]: number
  [ExerciseType.OVERHEAD_PRESS]: number
  [ExerciseType.BARBELL_ROW]: number
}>

export class Madcow5x5Program implements TrainingProgram<Madcow5x5Config> {
  private readonly config: Madcow5x5Config
  // TODO
  private matchPrInWeeks: number = 4

  constructor(config: Madcow5x5Config) {
    this.config = config
  }

  getMondayTrainingDay(week: number): TrainingDay {
    return {
      exercises: [
        this.getMondayExercise(ExerciseType.SQUAT, week),
        this.getMondayExercise(ExerciseType.BENCH_PRESS, week),
        this.getMondayExercise(ExerciseType.BARBELL_ROW, week),
      ],
    }
  }

  getMondayExercise(type: ExerciseType, week: number): Exercise {
    const { weightUnit } = this.getConfig()
    const repetitions = 5
    const heaviestLift = this.getHeaviestLift(type, week)
    return {
      type,
      sets: [
        { weightUnit, repetitions, weight: this.getMondayLift(heaviestLift, 5, 1) },
        { weightUnit, repetitions, weight: this.getMondayLift(heaviestLift, 5, 2) },
        { weightUnit, repetitions, weight: this.getMondayLift(heaviestLift, 5, 3) },
        { weightUnit, repetitions, weight: this.getMondayLift(heaviestLift, 5, 4) },
        { weightUnit, repetitions, weight: heaviestLift },
      ],
    }
  }

  // ROUND(F14*(1-SQINT*4)/(2*PLATE),0)*2*PLATE
  getMondayLift(heaviestLift: number, numberOfSets: number, set: number): number {
    const { rampingPercentage, smallestIncrement } = this.getConfig()
    return (
      Math.round((heaviestLift * (1 - rampingPercentage * (numberOfSets - set))) / smallestIncrement) *
      smallestIncrement
    )
  }

  // ROUND(SQ*(1.025^E9)/(2*PLATE),0)*2*PLATE
  getHeaviestLift(type: ExerciseType, week: number): number {
    const startingWeight = this.getStartingLift(type)
    if (week === 0) {
      return startingWeight
    }
    const { smallestIncrement } = this.getConfig()
    return Math.round((startingWeight * Math.pow(1.025, week)) / smallestIncrement) * smallestIncrement
  }

  // ROUND(H9*((1/1.025)^(PRWEEK-1))/(2*PLATE),0)*2*PLATE
  getStartingLift(type: ExerciseType): number {
    const { smallestIncrement } = this.getConfig()
    const oneRepMax = this.getInitialMax(type)
    const fiveRepMax = NRepMax.default(oneRepMax, 5)
    return (
      Math.round(fiveRepMax * (Math.pow(1 / 1.025, this.matchPrInWeeks - 1) / smallestIncrement)) * smallestIncrement
    )
  }

  getInitialMax(type: ExerciseType): number {
    const config = this.getConfig()
    if (typeof config[type] !== 'number') {
      throw new TypeError(`Lift type "${type}" not present in config!`)
    }
    return config[type]
  }

  getTotalWeeks(): number {
    return 12 // TODO
  }
  getTrainingWeek(week: number): TrainingWeek {
    return {
      monday: this.getMondayTrainingDay(week),
    }
  }
  getConfig(): Madcow5x5Config {
    return this.config
  }
}
