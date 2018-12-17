import { TrainingProgram, TrainingWeek, WeightUnit } from './typings'

export type LiftConfig = {
  oneRepMax: number
  interval: number
}

export type Madcow5x5Config = {
  weightUnit: WeightUnit
  bench: LiftConfig
  squat: LiftConfig
  ohp: LiftConfig
  rows: LiftConfig
}

export class Madcow5x5Training implements TrainingProgram<Madcow5x5Config> {
  private readonly config: Madcow5x5Config

  constructor(config: Madcow5x5Config) {
    this.config = config
  }

  getTrainingWeekCount(): number {
    throw new Error('Method not implemented.')
  }
  getTrainingWeek(index: number): TrainingWeek {
    throw new Error('Method not implemented.')
  }
  getConfig(): Madcow5x5Config {
    return this.config
  }
}
