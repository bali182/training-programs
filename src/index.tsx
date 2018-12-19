import React from 'react'
import { render } from 'react-dom'
import { WeekTable } from './components/WeekTable/WeekTable.component'
import { RepMaxQuestion } from './components/Questions/RepMaxQuestion/RepMaxQuestion.component'
import { ExerciseType, WeightUnit } from './model/typings'
import { SmallestPlateQuestion } from './components/Questions/SmallestPlateQuestion/SmallestPlateQuestion.component'
import { WeightUnitQuestion } from './components/Questions/WeightUnitQuestion/WeightUnitQuestion.component'
import { Madcow5x5Questions } from './components/CompositeQuestions/Madcow5x5Questions/Madcow5x5Questions.component'

render(
  <div>
    <Madcow5x5Questions />
    <WeekTable
      week={{
        monday: {
          exercises: [
            {
              type: ExerciseType.BENCH_PRESS,
              sets: [
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
              ],
            },
            {
              type: ExerciseType.SQUAT,
              sets: [
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
              ],
            },
            {
              type: ExerciseType.DEADLIFT,
              sets: [
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
                { repetitions: 5, weight: 100, weightUnit: WeightUnit.KILOGRAMMS },
              ],
            },
          ],
        },
      }}
    />
  </div>,
  document.getElementById('root')
)
