import React from 'react'
import { WeightUnitQuestion } from '../../Questions/WeightUnitQuestion/WeightUnitQuestion.component'
import { SmallestPlateQuestion } from '../../Questions/SmallestPlateQuestion/SmallestPlateQuestion.component'
import { RepMaxQuestion } from '../../Questions/RepMaxQuestion/RepMaxQuestion.component'
import { WeightUnit, ExerciseType } from '../../../model/typings'
import { OneRepMax } from '../../../model/utils/OneRepMaxCalculators'
import { lbsToKgs, kgsToLbs } from '../../../model/utils/weightConversion'
import { roundToSmallestIncrement } from '../../../model/utils/roundToSmallestIncrement'
import { Madcow5x5Config } from '../../../model/Madcow5x5Program'
import { RampingPercentageQuestion } from '../../Questions/RampingPercentageQuestion/RampingPercentageQuestion.component'

export type Madcow5x5QuestionsState = {
  weightUnit: WeightUnit
  smallestPlate: number
  squatReps: number
  squatWeight: number
  benchReps: number
  benchWeight: number
  rowsReps: number
  rowsWeight: number
  ohpReps: number
  ohpWeight: number
  deadliftReps: number
  deadliftWeight: number
  rampingPercentage: number
}

export type Madcow5x5QuestionsProps = {
  onChange?: (output: Madcow5x5Config) => void
}

export class Madcow5x5Questions extends React.PureComponent<Madcow5x5QuestionsProps, Madcow5x5QuestionsState> {
  state: Madcow5x5QuestionsState = {
    weightUnit: WeightUnit.KILOGRAMMS,
    smallestPlate: 1.25,
    squatReps: 8,
    squatWeight: 80,
    deadliftReps: 8,
    deadliftWeight: 100,
    benchReps: 5,
    benchWeight: 100,
    ohpReps: 5,
    ohpWeight: 60,
    rowsReps: 8,
    rowsWeight: 80,
    rampingPercentage: 12.5,
  }

  onWeightUnitChange = (weightUnit: WeightUnit) => {
    const converter = weightUnit === WeightUnit.KILOGRAMMS ? lbsToKgs : kgsToLbs
    const { state } = this
    this.update({
      weightUnit,
      smallestPlate: converter(state.smallestPlate),
      squatWeight: converter(state.squatWeight),
      benchWeight: converter(state.benchWeight),
      deadliftWeight: converter(state.deadliftWeight),
      rowsWeight: converter(state.rowsWeight),
      ohpWeight: converter(state.ohpWeight),
    })
  }

  onSmallestPlateChange = (smallestPlate: number) => {
    this.update({ smallestPlate })
  }

  onSquatChange = (squatReps: number, squatWeight: number) => {
    this.update({ squatReps, squatWeight })
  }

  onBenchChange = (benchReps: number, benchWeight: number) => {
    this.update({ benchReps, benchWeight })
  }

  onOhpChange = (ohpReps: number, ohpWeight: number) => {
    this.update({ ohpReps, ohpWeight })
  }

  onDeadliftChange = (deadliftReps: number, deadliftWeight: number) => {
    this.update({ deadliftReps, deadliftWeight })
  }

  onRowsChange = (rowsReps: number, rowsWeight: number) => {
    this.update({ rowsReps, rowsWeight })
  }

  onRampingPercentageChange = (rampingPercentage: number) => {
    this.update({ rampingPercentage })
  }

  update(state: Partial<Madcow5x5QuestionsState>) {
    const { onChange } = this.props
    const newState = { ...this.state, ...state }
    this.setState(newState)
    const smallestIncrement = newState.smallestPlate * 2
    onChange({
      smallestIncrement,
      weightUnit: newState.weightUnit,
      rampingPercentage: newState.rampingPercentage / 100,
      [ExerciseType.BARBELL_ROW]: roundToSmallestIncrement(
        OneRepMax.default(newState.rowsWeight, newState.rowsReps),
        smallestIncrement
      ),
      [ExerciseType.DEADLIFT]: roundToSmallestIncrement(
        OneRepMax.default(newState.deadliftWeight, newState.deadliftReps),
        smallestIncrement
      ),
      [ExerciseType.BENCH_PRESS]: roundToSmallestIncrement(
        OneRepMax.default(newState.benchWeight, newState.benchReps),
        smallestIncrement
      ),
      [ExerciseType.OVERHEAD_PRESS]: roundToSmallestIncrement(
        OneRepMax.default(newState.ohpWeight, newState.ohpReps),
        smallestIncrement
      ),
      [ExerciseType.SQUAT]: roundToSmallestIncrement(
        OneRepMax.default(newState.squatWeight, newState.squatReps),
        smallestIncrement
      ),
    })
  }

  render() {
    const { state } = this
    return (
      <React.Fragment>
        <WeightUnitQuestion weightUnit={state.weightUnit} onChange={this.onWeightUnitChange} />
        <SmallestPlateQuestion
          weight={state.smallestPlate}
          weightUnit={state.weightUnit}
          onChange={this.onSmallestPlateChange}
        />
        <RampingPercentageQuestion
          percentage={this.state.rampingPercentage}
          onChange={this.onRampingPercentageChange}
        />
        <RepMaxQuestion
          weight={state.squatWeight}
          reps={state.squatReps}
          exerciseType={ExerciseType.SQUAT}
          weightUnit={state.weightUnit}
          onChange={this.onSquatChange}
        />
        <RepMaxQuestion
          weight={state.deadliftWeight}
          reps={state.deadliftReps}
          exerciseType={ExerciseType.DEADLIFT}
          weightUnit={state.weightUnit}
          onChange={this.onDeadliftChange}
        />
        <RepMaxQuestion
          weight={state.benchWeight}
          reps={state.benchReps}
          exerciseType={ExerciseType.BENCH_PRESS}
          weightUnit={state.weightUnit}
          onChange={this.onBenchChange}
        />
        <RepMaxQuestion
          weight={state.rowsWeight}
          reps={state.rowsReps}
          exerciseType={ExerciseType.BARBELL_ROW}
          weightUnit={state.weightUnit}
          onChange={this.onRowsChange}
        />
        <RepMaxQuestion
          weight={state.ohpWeight}
          reps={state.ohpReps}
          exerciseType={ExerciseType.OVERHEAD_PRESS}
          weightUnit={state.weightUnit}
          onChange={this.onOhpChange}
        />
      </React.Fragment>
    )
  }

  static defaultProps: Madcow5x5QuestionsProps = {
    onChange: () => {},
  }
}
