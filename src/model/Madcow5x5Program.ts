import { TrainingProgram, TrainingWeek, WeightUnit, TrainingDay, Exercise, ExerciseType } from './typings'
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
        this.getGenericExercise(ExerciseType.SQUAT, week, 5),
        this.getGenericExercise(ExerciseType.BENCH_PRESS, week, 5),
        this.getGenericExercise(ExerciseType.BARBELL_ROW, week, 5),
      ],
    }
  }

  getWednesdayTrainingDay(week: number): TrainingDay {
    const { sets: squatSets } = this.getGenericExercise(ExerciseType.SQUAT, week, 5)
    const [firstSquatSet, secondSquatSet, thirdSquatSet] = squatSets
    return {
      exercises: [
        { type: ExerciseType.SQUAT, sets: [firstSquatSet, secondSquatSet, thirdSquatSet, thirdSquatSet] },
        this.getGenericExercise(ExerciseType.DEADLIFT, week, 4),
        this.getGenericExercise(ExerciseType.OVERHEAD_PRESS, week, 4),
      ],
    }
  }

  getFridayTrainingDay(week: number): TrainingDay {
    return {
      exercises: [
        this.getFridayExercise(ExerciseType.SQUAT, week),
        this.getFridayExercise(ExerciseType.BENCH_PRESS, week),
        this.getFridayExercise(ExerciseType.BARBELL_ROW, week),
      ],
    }
  }

  getGenericExercise(type: ExerciseType, week: number, sets: number): Exercise {
    const { weightUnit } = this.getConfig()
    const repetitions = 5
    const heaviestLift = this.getHeaviestLift(type, week)
    return {
      type,
      sets: range(sets)
        .map((i) => i + 1)
        .map((set) => ({
          weightUnit,
          repetitions,
          weight: set === sets ? heaviestLift : this.getGenericLift(heaviestLift, sets, set),
        })),
    }
  }

  getFridayExercise(type: ExerciseType, week: number): Exercise {
    const { weightUnit, smallestIncrement } = this.getConfig()
    const { sets: mondaySets } = this.getGenericExercise(type, week, 5)
    const [mondayFirst, mondaySecond, mondayThird, mondayFourth] = mondaySets
    const startingLift = this.getStartingLift(type)
    return {
      type,
      sets: [
        mondayFirst,
        mondaySecond,
        mondayThird,
        mondayFourth,
        // ROUND(BBR*(1.025^G9)/(2*PLATE),0)*2*PLATE
        {
          repetitions: 3,
          weightUnit,
          weight: Math.round((startingLift * Math.pow(1.025, week + 1)) / smallestIncrement) * smallestIncrement,
        },
        mondayThird,
      ],
    }
  }

  // ROUND(F14*(1-SQINT*4)/(2*PLATE),0)*2*PLATE
  getGenericLift(heaviestLift: number, numberOfSets: number, set: number): number {
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
      wednesday: this.getWednesdayTrainingDay(week),
      friday: this.getFridayTrainingDay(week),
    }
  }
  getConfig(): Madcow5x5Config {
    return this.config
  }
}
