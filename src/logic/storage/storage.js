
export const saveStorage = (newBoard, newTurn) => {
  window.localStorage.setItem('board', JSON.stringify(newBoard))
  window.localStorage.setItem('turn', newTurn)
}

export const removeStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}