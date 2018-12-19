import React from 'react'
import { WeightUnit } from '../../../model/typings'
import { getWeightUnitShortName } from '../../providers'
import { inputStyle, questionStyle, weightStyle } from '../Questions.module.scss'

export type SmallestPlateQuestionProps = {
  weight: number
  weightUnit: WeightUnit
  onChange?: (weight: number) => void
}

export class SmallestPlateQuestion extends React.PureComponent<SmallestPlateQuestionProps> {
  onWeightChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(parseFloat(value))
  }
  weightEditor() {
    const { weight, weightUnit } = this.props
    return (
      <input
        className={inputStyle}
        type="number"
        min={1}
        max={50}
        step={weightUnit === WeightUnit.KILOGRAMMS ? 0.25 : 1}
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
  doubleWeight() {
    const { weightUnit, weight } = this.props
    const weightUnitName = getWeightUnitShortName(weightUnit)
    return (
      <span className={weightStyle}>
        {weight * 2} {weightUnitName}
      </span>
    )
  }
  render() {
    return (
      <div className={questionStyle}>
        The smallest plate at my gym is {this.weightEditor()} {this.weightUnit()} meaning {this.doubleWeight()}{' '}
        increments.
      </div>
    )
  }

  static defaultProps: Partial<SmallestPlateQuestionProps> = {
    onChange: () => {},
  }
}
