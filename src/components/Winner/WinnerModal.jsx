import { Square } from "../Square/Square"
import PropTypes from 'prop-types'
import './WinnerModal.css'

function WinnerModal({ winner, resetGame }) {

  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : 'Ganó:'

  return (
    <section className='winner'>
      <div className="text">
        <h2>{winnerText}</h2>
        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>
        <footer>
          <button onClick={resetGame}>Reiniciar</button>
        </footer>
      </div>
    </section>
  )
}
WinnerModal.propTypes = {
  winner: PropTypes.any,
  resetGame: PropTypes.func
}

export default WinnerModal