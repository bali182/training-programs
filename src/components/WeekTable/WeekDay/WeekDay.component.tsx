import React from 'react'
import { TrainingDay, Exercise } from '../../../model/typings'
import {
  fullHeightStyle,
  exerciseHeaderStyle,
  exerciseUnderlineStyle,
  exerciseContainerStyle,
  exerciseListItemStyle,
  exerciseCheckmarkStyle,
  exerciseParamsStyle,
} from './WeekDay.module.scss'
import { getExerciseTypeColor, getExerciseTypeName } from '../../providers'

export type WeekDayProps = {
  day: TrainingDay
}

export class WeekDay extends React.PureComponent<WeekDayProps> {
  renderEmptyContent() {
    return <div className={fullHeightStyle}>Rest day!</div>
  }
  renderExercise({ sets, type }: Exercise, index: number) {
    return (
      <div className={exerciseContainerStyle} key={index}>
        <div className={exerciseHeaderStyle}>
          {getExerciseTypeName(type)}
          <div className={exerciseUnderlineStyle} style={{ backgroundColor: getExerciseTypeColor(type) }} />
        </div>
        <ul>
          {sets.map(({ weightUnit, weight, repetitions }, i) => (
            <li key={i} className={exerciseListItemStyle}>
              <span className={exerciseParamsStyle}>
                {repetitions} x {weight} {weightUnit}
              </span>
              <div className={exerciseCheckmarkStyle} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
  renderExercises() {
    const { day } = this.props
    return day.exercises.map((exercise, i) => this.renderExercise(exercise, i))
  }
  render() {
    const { day } = this.props
    if (day === null || day === undefined || day.exercises.length === 0) {
      return this.renderEmptyContent()
    } else {
      return <React.Fragment>{this.renderExercises()}</React.Fragment>
    }
  }
}
