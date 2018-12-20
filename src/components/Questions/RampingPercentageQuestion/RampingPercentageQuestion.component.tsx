import React from 'react'
import { inputStyle, questionStyle } from '../Questions.module.scss'

export type RampingPercentageQuestionProps = {
  percentage: number
  onChange?: (percentage: number) => void
}

export class RampingPercentageQuestion extends React.PureComponent<RampingPercentageQuestionProps> {
  onPercentageChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(parseFloat(value))
  }
  percentageEditor() {
    const { percentage } = this.props
    return (
      <input
        className={inputStyle}
        type="number"
        min={1}
        max={100}
        step={0.5}
        value={percentage}
        placeholder="reps..."
        onChange={this.onPercentageChange}
      />
    )
  }
  render() {
    return <div className={questionStyle}>I want my sets to increase by {this.percentageEditor()}% in weight.</div>
  }

  static defaultProps: Partial<RampingPercentageQuestionProps> = {
    onChange: () => {},
  }
}
