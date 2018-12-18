import React from 'react'
import { weekTableStyle, columnStyle, columnHeaderStyle, columnContent } from './WeekTable.module.scss'
import { TrainingWeek, TrainingDay } from '../../model/typings'
import { WeekDay } from './WeekDay/WeekDay.component'

export type WeekTableProps = {
  week: TrainingWeek
}

export class WeekTable extends React.PureComponent<WeekTableProps> {
  renderColumn(day: TrainingDay, name: string) {
    return (
      <div className={columnStyle}>
        <div className={columnHeaderStyle}>{name}</div>
        <div className={columnContent}>
          <WeekDay day={day} />
        </div>
      </div>
    )
  }

  render() {
    const { week } = this.props
    return (
      <div className={weekTableStyle}>
        {this.renderColumn(week.monday, 'Monday')}
        {this.renderColumn(week.tuesday, 'Tuesday')}
        {this.renderColumn(week.wednesday, 'Wednesday')}
        {this.renderColumn(week.thursday, 'Thursday')}
        {this.renderColumn(week.friday, 'Friday')}
        {week.saturday || week.sunday ? this.renderColumn(week.saturday, 'Saturday') : null}
        {week.saturday || week.sunday ? this.renderColumn(week.sunday, 'Sunday') : null}
      </div>
    )
  }
}
