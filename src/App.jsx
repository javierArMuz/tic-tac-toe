import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import { Square } from './components/Square/Square'
import { TURNS, TURNSARRAY } from './constants'
import { checkEndGame, checkWinner } from './logic/board'
import WinnerModal from './components/Winner/WinnerModal'
import { removeStorage, saveStorage } from './logic/storage/storage'


function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const initialTurn = (TURNSARRAY) => {
    return TURNSARRAY[Math.floor(Math.random() * TURNSARRAY.length)]
  }

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    if (turnFromStorage) return turnFromStorage
    return initialTurn(TURNSARRAY)
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // No actualizamos esta posición si ya está ocupada
    if (board[index]) return
    // Actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guardar partida en localStorage
    saveStorage(newBoard, newTurn)
    // Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(winner === null || winner === false ? initialTurn(TURNSARRAY) : winner)
    setWinner(null)
    // Eliminar del localStorage
    removeStorage()
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}
        style={{
          width: '100%', margin: '25px 0',
          fontSize: '2rem', padding: '0', lineHeight: '1.5'
        }}
      >🔄</button>
      <section className='game'>
        {board.map((_, index) => (
          <Square key={index} index={index}
            updateBoard={updateBoard}>
            {board[index]}
          </Square>
        ))}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}
        >{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}
        >{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
