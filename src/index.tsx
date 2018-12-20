import React from 'react'
import { render } from 'react-dom'
import { WeekTable } from './components/WeekTable/WeekTable.component'
import { Madcow5x5Questions } from './components/CompositeQuestions/Madcow5x5Questions/Madcow5x5Questions.component'
import { Madcow5x5Config, Madcow5x5Program } from './model/Madcow5x5Program'
import { range } from './model/utils/genericUtils'

type TestComponentState = {
  config: Madcow5x5Config
}

class TestComponent extends React.Component<any, TestComponentState> {
  state: TestComponentState = {
    config: null,
  }
  renderTables() {
    const { config } = this.state
    if (!config) {
      return null
    }
    const program = new Madcow5x5Program(config)
    return range(program.getTotalWeeks())
      .map((week) => program.getTrainingWeek(week))
      .map((week, index) => <WeekTable week={week} key={index} />)
  }
  saveConfig = (config: Madcow5x5Config) => {
    this.setState({ config })
  }
  render() {
    return (
      <React.Fragment>
        <Madcow5x5Questions onChange={this.saveConfig} />
        {this.renderTables()}
      </React.Fragment>
    )
  }
}

render(
  <div>
    <TestComponent />
  </div>,
  document.getElementById('root')
)
