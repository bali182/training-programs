export enum ExerciseType {
  BENCH_PRESS = 'benchPress',
  GENERIC_SQUAT = 'squat',
  HIGHBAR_SQUAT = 'highbarSquat',
  LOWBAR_SQUAT = 'lowbarSquat',
  FRONT_SQUAT = 'frontSquat',
  GENERIC_DEADLIFT = 'deadlift',
  CONVENTIONAL_DEADLIFT = 'conventionalDeadlift',
  SUMO_DEADLIFT = 'sumoDeadlift',
  OVERHEAD_PRESS = 'overheadPress',
  BARBELL_ROW = 'barbellRow',
}

export enum WeightUnit {
  KILOGRAMMS = 'kgs',
  POUNDS = 'lbs',
}

export enum Day {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export type TrainingProgram<Config> = {
  getTrainingWeekCount(): number
  getTrainingWeek(index: number): TrainingWeek
  getConfig(): Config
}

export type TrainingWeek = {
  days: TrainingDay[]
}

export type TrainingDay = {
  day: TrainingDay
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
