import './App.css'
import { useEffect, useMemo, useState } from 'react'
import { db } from './db'
import type { TimeEntry, TimeEntryType } from './types'

const TYPES: TimeEntryType[] = ['Entrada', 'Almoço', 'Retorno', 'Saída']

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

function App() {
  const [now, setNow] = useState(() => new Date())
  const [marcacoes, setMarcacoes] = useState<TimeEntry[]>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(true)

  const hoje = getLocalDateKey(now)

  async function carregarMarcacoes() {
    const entries = await db.timeEntries
      .where('date')
      .equals(hoje)
      .sortBy('timestamp')

    setMarcacoes(entries)
    setLoading(false)
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    carregarMarcacoes().catch((error) => {
      console.error('Erro ao carregar marcações:', error)
      setLoading(false)
    })
  }, [hoje])

  const proximoTipo = useMemo<TimeEntryType | 'Concluído'>(() => {
    const registrados = new Set(marcacoes.map((entry) => entry.type))

    return TYPES.find((type) => !registrados.has(type)) ?? 'Concluído'
  }, [marcacoes])

  async function confirmarPonto() {
    if (proximoTipo === 'Concluído') return

    const timestamp = Date.now()

    const entry: TimeEntry = {
      type: proximoTipo,
      timestamp,
      date: getLocalDateKey(new Date(timestamp)),
    }

    await db.timeEntries.add(entry)
    await carregarMarcacoes()

    setShowConfirm(false)

    alert(`✓ ${proximoTipo} registrada às ${formatTime(timestamp)}`)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Meu Ponto</h1>
        <p>Controle pessoal de ponto de trabalho</p>
      </header>

      <main className="app-main">
        <section className="time-display">
          <div className="current-time">
            <h2 id="clock">{formatTime(now)}</h2>
            <p id="date">{formatDate(now)}</p>
          </div>
        </section>

        <section className="quick-actions">
          <button
            className="btn-primary btn-clock"
            onClick={() => setShowConfirm(true)}
            disabled={loading || proximoTipo === 'Concluído'}
          >
            🕐 BATER PONTO
          </button>
        </section>

        <section className="info-panel">
          <div className="info-item">
            <span>Próximo ponto:</span>
            <strong id="proximoEvento">{proximoTipo}</strong>
          </div>

          <div className="info-item">
            <span>Marcações de hoje:</span>
            <strong id="marcacoesHoje">{marcacoes.length}</strong>
          </div>
        </section>

        {marcacoes.length > 0 && (
          <section className="marcacoes-list">
            <h3>Marcações do dia</h3>

            {marcacoes.map((entry) => (
              <div key={entry.id} className="marcacao-item">
                <span className="marcacao-tipo">{entry.type}</span>
                <span className="marcacao-hora">
                  {formatTime(entry.timestamp)}
                </span>
              </div>
            ))}
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>v0.2.0 - Fase 2</p>
      </footer>

      {showConfirm && proximoTipo !== 'Concluído' && (
        <div
          className="modal-overlay"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>Confirmar registro</h2>

            <div className="confirmation-content">
              <div className="confirmation-type">{proximoTipo}</div>
              <div className="confirmation-time">
                {formatTime(now)}
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>

              <button
                className="btn-confirm"
                onClick={() => void confirmarPonto()}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
