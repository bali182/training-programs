export enum ExerciseType {
  BENCH_PRESS = 'benchPress',
  SQUAT = 'squat',
  DEADLIFT = 'deadlift',
  OVERHEAD_PRESS = 'overheadPress',
  BARBELL_ROW = 'barbellRow',
}

export enum WeightUnit {
  KILOGRAMMS = 'kgs',
  POUNDS = 'lbs',
}

export type TrainingProgram<Config> = {
  getTotalWeeks(): number
  getTrainingWeek(index: number): TrainingWeek
  getConfig(): Config
}

export type TrainingWeek = {
  monday?: TrainingDay
  tuesday?: TrainingDay
  wednesday?: TrainingDay
  thursday?: TrainingDay
  friday?: TrainingDay
  saturday?: TrainingDay
  sunday?: TrainingDay
}

export type TrainingDay = {
  exercises: Exercise[]
}

export type Exercise = {
  type: ExerciseType
  sets: ExerciseSet[]
}

export type ExerciseSet = {
  weightUnit: WeightUnit
  weight: number
  repetitions: number
}
