import React from 'react'
import { render } from 'react-dom'
import { WeekTable } from './components/WeekTable/WeekTable.component'
import { RepMaxQuestion } from './components/Questions/RepMaxQuestion/RepMaxQuestion.component'
import { ExerciseType, WeightUnit } from './model/typings'
import { SmallestPlateQuestion } from './components/Questions/SmallestPlateQuestion/SmallestPlateQuestion.component'

render(
  <div>
    <SmallestPlateQuestion weight={1.25} weightUnit={WeightUnit.KILOGRAMMS} />
    <RepMaxQuestion weight={120} reps={5} exerciseType={ExerciseType.SQUAT} weightUnit={WeightUnit.KILOGRAMMS} />
    <RepMaxQuestion weight={140} reps={5} exerciseType={ExerciseType.DEADLIFT} weightUnit={WeightUnit.KILOGRAMMS} />
    <RepMaxQuestion weight={110} reps={5} exerciseType={ExerciseType.BARBELL_ROW} weightUnit={WeightUnit.KILOGRAMMS} />
    <RepMaxQuestion weight={100} reps={5} exerciseType={ExerciseType.BENCH_PRESS} weightUnit={WeightUnit.KILOGRAMMS} />
    <RepMaxQuestion
      weight={80}
      reps={5}
      exerciseType={ExerciseType.OVERHEAD_PRESS}
      weightUnit={WeightUnit.KILOGRAMMS}
    />
    <WeekTable week={{}} />
  </div>,
  document.getElementById('root')
)
