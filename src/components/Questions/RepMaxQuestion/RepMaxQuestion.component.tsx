import React from 'react'
import { WeightUnit, ExerciseType } from '../../../model/typings'
import { getExerciseTypeColor, getWeightUnitShortName, getExerciseTypeNamePlural } from '../../providers'
import { inputStyle, questionStyle, weightStyle } from '../Questions.module.scss'

export type RepMaxQuestionProps = {
  weight: number
  reps: number
  weightUnit: WeightUnit
  exerciseType: ExerciseType
  onChange?: (reps: number, weight: number) => void
}

export class RepMaxQuestion extends React.PureComponent<RepMaxQuestionProps> {
  onWeightChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(this.props.reps, parseInt(value, 10))
  }
  onRepsChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(parseInt(value, 10), this.props.weight)
  }
  exerciseName() {
    const { exerciseType } = this.props
    const exerciseName = getExerciseTypeNamePlural(exerciseType).toLowerCase()
    const exerciseColor = getExerciseTypeColor(exerciseType)
    return <span style={{ fontWeight: 700, color: exerciseColor }}>{exerciseName}</span>
  }
  repsEditor() {
    const { reps } = this.props
    return (
      <input
        className={inputStyle}
        type="number"
        min="1"
        max="10"
        value={reps || ''}
        placeholder="reps..."
        onChange={this.onRepsChange}
      />
    )
  }
  weightEditor() {
    const { weight } = this.props
    return (
      <input
        className={inputStyle}
        type="number"
        min="1"
        max="1000"
        value={weight || ''}
        onChange={this.onWeightChange}
        placeholder="weight..."
      />
    )
  }
  weightUnit() {
    const { weightUnit } = this.props
    const weightUnitName = getWeightUnitShortName(weightUnit)
    return <span className={weightStyle}>{weightUnitName}</span>
  }
  render() {
    return (
      <div className={questionStyle}>
        I can perform {this.repsEditor()} {this.exerciseName()} with {this.weightEditor()} {this.weightUnit()}.
      </div>
    )
  }

  static defaultProps: Partial<RepMaxQuestionProps> = {
    onChange: () => {},
  }
}
