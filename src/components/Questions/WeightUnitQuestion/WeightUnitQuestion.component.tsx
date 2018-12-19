import React from 'react'
import { WeightUnit } from '../../../model/typings'
import { getWeightUnitShortName } from '../../providers'
import { inputStyle, questionStyle } from '../Questions.module.scss'

export type WeightUnitQuestionProps = {
  weightUnit: WeightUnit
  onChange?: (unit: WeightUnit) => void
}

export class WeightUnitQuestion extends React.PureComponent<WeightUnitQuestionProps> {
  onWeightUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange(e.target.value as WeightUnit)
  }

  weightUnitEditor() {
    const { weightUnit } = this.props
    return (
      <select className={inputStyle} value={weightUnit} placeholder="unit..." onChange={this.onWeightUnitChange}>
        <option value={WeightUnit.KILOGRAMMS}>{getWeightUnitShortName(WeightUnit.KILOGRAMMS)}</option>
        <option value={WeightUnit.POUNDS}>{getWeightUnitShortName(WeightUnit.POUNDS)}</option>
      </select>
    )
  }
  render() {
    return <div className={questionStyle}>My preferred unit of weight is {this.weightUnitEditor()}.</div>
  }

  static defaultProps: Partial<WeightUnitQuestionProps> = {
    onChange: () => {},
  }
}
