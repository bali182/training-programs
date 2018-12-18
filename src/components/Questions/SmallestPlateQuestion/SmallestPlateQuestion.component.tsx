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
    console.log(value)
    this.props.onChange(parseInt(value, 10))
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
    const { weight } = this.props
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
