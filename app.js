document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.getElementById('grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  const width = 4
  let squares = []
  let score = 0

  // create a playing board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      let square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
  }

  createBoard()

  // generate a random number
  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == 0) {
      const generateNumbers = [2, 4]
      squares[randomNumber].innerHTML = generateNumbers[Math.floor(Math.random() * generateNumbers.length)]
      checkForGameOver()
    } else generate()
  }

  // swipe right
  function moveRight() {
    for (let i = 0; i < width * width; i++) {
      if (i % width === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = width - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        squares[i].innerHTML = newRow[0]
        squares[i+1].innerHTML = newRow[1]
        squares[i+2].innerHTML = newRow[2]
        squares[i+3].innerHTML = newRow[3]
      }
    }
  }

  // swipe left
  function moveLeft() {
    for (let i = 0; i < width * width; i++) {
      if (i % width === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = width - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i+1].innerHTML = newRow[1]
        squares[i+2].innerHTML = newRow[2]
        squares[i+3].innerHTML = newRow[3]
      }
    }
  }

  // swipe down
  function moveDown() {
    for (let i = 0; i < width; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = width - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      squares[i].innerHTML = newColumn[0]
      squares[i+width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

  // swipe up
  function moveUp() {
    for (let i = 0; i < width; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = width - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i+width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

  function combineRowLeft() {
    for (let i = 0; i < 15; i++) {
      if ((i % 4 !== 3) && squares[i].innerHTML === squares [i+1].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i+1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  function combineRowRight() {
    for (let i = 14; i >= 0; i--) {
      if ((i % 4 !== 3) && squares[i].innerHTML === squares [i+1].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i+1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  function combineColumnDown() {
    for (let i = 15; i >= 4; i--) {
      if (squares[i].innerHTML === squares [i-width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i-width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i-width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  function combineColumnUp() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares [i+width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i+width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  // assign keycodes
  function control(e) {
    switch(e.keyCode) {
      case 39: keyRight()
      break
      case 37: keyLeft()
      break
      case 40: keyDown()
      break
      case 38: keyUp()
    }
  }

  document.addEventListener('keydown', control)

  function keyRight() {
    let snapshotBeforeMove = JSON.stringify(squares.map(num => num.innerHTML))
    moveRight()
    combineRowRight()
    moveRight()
    let snapshotAfterMove = JSON.stringify(squares.map(num => num.innerHTML))
    if (snapshotBeforeMove != snapshotAfterMove) {
      generate()
    }
  }

  function keyLeft() {
    let snapshotBeforeMove = JSON.stringify(squares.map(num => num.innerHTML))
    moveLeft()
    combineRowLeft()
    moveLeft()
    let snapshotAfterMove = JSON.stringify(squares.map(num => num.innerHTML))
    if (snapshotBeforeMove != snapshotAfterMove) {
      generate()
    }
  }

  function keyDown() {
    let snapshotBeforeMove = JSON.stringify(squares.map(num => num.innerHTML))
    moveDown()
    combineColumnDown()
    moveDown()
    let snapshotAfterMove = JSON.stringify(squares.map(num => num.innerHTML))
    if (snapshotBeforeMove != snapshotAfterMove) {
      generate()
    }
  }

  function keyUp() {
    let snapshotBeforeMove = JSON.stringify(squares.map(num => num.innerHTML))
    moveUp()
    combineColumnUp()
    moveUp()
    let snapshotAfterMove = JSON.stringify(squares.map(num => num.innerHTML))
    if (snapshotBeforeMove != snapshotAfterMove) {
      generate()
    }
  }

  // check for win
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        alert('You won!')
        resultDisplay.innerHTML = 'GG EZ'
        document.removeEventListener('keydown', control)
      }
    }
  }

  // check for lose
  function checkForGameOver() {
    let zeros = 0
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
    if (zeros === 0) {
      alert('You lost!')
      resultDisplay.innerHTML = 'Tristut'
      document.removeEventListener('keydown', control)
    }
  }
})