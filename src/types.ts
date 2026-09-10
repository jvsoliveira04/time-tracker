export type TimeEntryType = 'Entrada' | 'Almoço' | 'Retorno' | 'Saída'

export interface TimeEntry {
  id?: number
  type: TimeEntryType
  timestamp: number
  date: string
}
