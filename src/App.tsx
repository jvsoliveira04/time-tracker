import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [time, setTime] = useState<string>('--:--')
  const [date, setDate] = useState<string>('--/--/----')
  const [marcacoes, setMarcacoes] = useState<any[]>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [proximoTipo, setProximoTipo] = useState('Entrada')

  // Atualizar relógio
  useEffect(() => {
    function updateClock() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      setTime(`${hours}:${minutes}`)

      const day = String(now.getDate()).padStart(2, '0')
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = now.getFullYear()
      setDate(`${day}/${month}/${year}`)
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  // Carregar marcações salvas
  useEffect(() => {
    const saved = localStorage.getItem('marcacoes')
    if (saved) {
      setMarcacoes(JSON.parse(saved))
      definirProximoTipo(JSON.parse(saved))
    }
  }, [])

  // Definir qual é o próximo tipo
  function definirProximoTipo(marcacoesList: any[]) {
    const tipos = ['Entrada', 'Almoço', 'Retorno', 'Saída']
    const registrados = marcacoesList.map(m => m.tipo)
    
    for (let tipo of tipos) {
      if (!registrados.includes(tipo)) {
        setProximoTipo(tipo)
        return
      }
    }
    setProximoTipo('Concluído')
  }

  // Bater ponto
  function baterPonto() {
    if (proximoTipo !== 'Concluído') {
      setShowConfirm(true)
    }
  }

  // Confirmar e salvar
  function confirmarPonto() {
    const novaMarcacao = {
      id: Date.now(),
      tipo: proximoTipo,
      hora: time,
      data: date
    }

    const novasMarcacoes = [...marcacoes, novaMarcacao]
    setMarcacoes(novasMarcacoes)
    localStorage.setItem('marcacoes', JSON.stringify(novasMarcacoes))
    
    definirProximoTipo(novasMarcacoes)
    setShowConfirm(false)

    alert(`✓ ${proximoTipo} registrada às ${time}`)
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
            <h2 id="clock">{time}</h2>
            <p id="date">{date}</p>
          </div>
        </section>

        <section className="quick-actions">
          <button 
            className="btn-primary btn-clock" 
            onClick={baterPonto}
            disabled={proximoTipo === 'Concluído'}
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
            {marcacoes.map((m) => (
              <div key={m.id} className="marcacao-item">
                <span className="marcacao-tipo">{m.tipo}</span>
                <span className="marcacao-hora">{m.hora}</span>
              </div>
            ))}
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>v0.1.0 - Fase 1</p>
      </footer>

      {showConfirm && proximoTipo !== 'Concluído' && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirmar registro</h2>
            <div className="confirmation-content">
              <div className="confirmation-type">{proximoTipo}</div>
              <div className="confirmation-time">{time}</div>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
                Cancelar
              </button>
              <button className="btn-confirm" onClick={confirmarPonto}>
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
