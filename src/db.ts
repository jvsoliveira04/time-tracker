import Dexie, { type Table } from 'dexie'
import type { TimeEntry } from './types'

class TimeTrackerDB extends Dexie {
  timeEntries!: Table<TimeEntry, number>

  constructor() {
    super('time-tracker-db')

    this.version(1).stores({
      timeEntries: '++id, date, timestamp, type',
    })
  }
}

export const db = new TimeTrackerDB()
