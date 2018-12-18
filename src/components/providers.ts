import { ExerciseType, WeightUnit } from '../model/typings'

export const UnusedExerciseColors = [
  '#E09F3E', // lighter orange
  '#2F3061', // darker purple
  '#5F5980', // lighter purple
  '#84DD63', // lighter green
  '#76BED0', // lighter blue
  '#F7CB15', // yellow
  '#4464AD', // darker blue
  '#7D4600', // orange/brown
  '#05A8AA', // darker cyan
  '#DC602E', // darker orange
  '#7C6354', // desaturated brown
  '#8C1A6A', // bright purple
  '#03120E', // dark green/brown
]

export function getExerciseTypeColor(type: ExerciseType): string {
  switch (type) {
    case ExerciseType.BARBELL_ROW:
      return '#335C67'
    case ExerciseType.BENCH_PRESS:
      return '#9E2A2B'
    case ExerciseType.DEADLIFT:
      return '#6BAA75'
    case ExerciseType.SQUAT:
      return '#F55D3E'
    case ExerciseType.OVERHEAD_PRESS:
      return '#D65780'
  }
}

export function getExerciseTypeName(type: ExerciseType): string {
  switch (type) {
    case ExerciseType.BARBELL_ROW:
      return 'Barbell row'
    case ExerciseType.BENCH_PRESS:
      return 'Bench press'
    case ExerciseType.DEADLIFT:
      return 'Deadlift'
    case ExerciseType.SQUAT:
      return 'Squat'
    case ExerciseType.OVERHEAD_PRESS:
      return 'Overhead press'
  }
}

export function getExerciseTypeNamePlural(type: ExerciseType): string {
  switch (type) {
    case ExerciseType.BARBELL_ROW:
      return 'Barbell rows'
    case ExerciseType.BENCH_PRESS:
      return 'Bench presses'
    case ExerciseType.DEADLIFT:
      return 'Deadlifts'
    case ExerciseType.SQUAT:
      return 'Squats'
    case ExerciseType.OVERHEAD_PRESS:
      return 'Overhead presses'
  }
}

export function getWeightUnitShortName(unit: WeightUnit): string {
  switch (unit) {
    case WeightUnit.KILOGRAMMS:
      return 'kgs'
    case WeightUnit.POUNDS:
      return 'lbs'
  }
}
