/**
 * Funções para cálculos de tempo e horas
 */

// Converte HH:MM para minutos
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// Converte minutos para HH:MM
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(Math.abs(minutes) / 60)
  const mins = Math.abs(minutes) % 60
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

// Formata minutos como XXhYY (ex: 08h48)
export function formatMinutes(minutes: number): string {
  const isNegative = minutes < 0
  const absMinutes = Math.abs(minutes)
  const hours = Math.floor(absMinutes / 60)
  const mins = absMinutes % 60
  const formatted = `${String(hours).padStart(2, '0')}h${String(mins).padStart(2, '0')}`
  return isNegative ? `-${formatted}` : `+${formatted}`
}

// Calcula horas trabalhadas no dia (entrada -> almoço -> retorno -> saída)
export function calculateHorasTrabalhas(marcacoes: any[]): number {
  const entrada = marcacoes.find(m => m.tipo === 'Entrada')
  const almoco = marcacoes.find(m => m.tipo === 'Almoço')
  const retorno = marcacoes.find(m => m.tipo === 'Retorno')
  const saida = marcacoes.find(m => m.tipo === 'Saída')

  if (!entrada || !almoco || !retorno || !saida) {
    return 0 // Se faltam marcações, retorna 0
  }

  const periodo1 = timeToMinutes(almoco.hora) - timeToMinutes(entrada.hora)
  const periodo2 = timeToMinutes(saida.hora) - timeToMinutes(retorno.hora)

  return periodo1 + periodo2
}

// Calcula saldo do dia
export function calculateSaldoDia(horasTrabalhadas: number, horasEsperadas: number = 528): number {
  return horasTrabalhadas - horasEsperadas
}

// Verifica se faltam marcações
export function marcacoesFaltando(marcacoes: any[]): string[] {
  const tipos = ['Entrada', 'Almoço', 'Retorno', 'Saída']
  const registrados = marcacoes.map(m => m.tipo)
  return tipos.filter(tipo => !registrados.includes(tipo))
}
