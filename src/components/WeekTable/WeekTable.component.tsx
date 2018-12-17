import React from 'react'
import {
  weekTableStyle,
  columnStyle,
  columnHeaderStyle,
  activityHeaderStyle,
  columnContent,
} from './WeekTable.module.scss'

export class WeekTable extends React.PureComponent {
  render() {
    return (
      <div className={weekTableStyle}>
        <WeekDayColumn day="Monday">
          <WeekdayContent>
            <div>
              <div className={activityHeaderStyle}>Bench press</div>
            </div>
            <div className={activityHeaderStyle}>Squat</div>
            <div className={activityHeaderStyle}>Barbell rows</div>
          </WeekdayContent>
        </WeekDayColumn>
        <WeekDayColumn day="Tuesday" />
        <WeekDayColumn day="Wednesday" />
        <WeekDayColumn day="Thursday" />
        <WeekDayColumn day="Friday" />
      </div>
    )
  }
}

export type WeekDayColumnProps = {
  day: string
}

export class WeekDayColumn extends React.Component<WeekDayColumnProps> {
  render() {
    const { day, children } = this.props
    return (
      <div className={columnStyle}>
        <div className={columnHeaderStyle}>{day}</div>
        {children}
      </div>
    )
  }
}

export class WeekdayContent extends React.PureComponent {
  render() {
    const { children } = this.props
    return <div className={columnContent}>{children}</div>
  }
}
