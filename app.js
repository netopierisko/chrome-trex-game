document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const dino = document.querySelector('.dino')
  const alert = document.querySelector('#alert')
  let isJumping = false
  let gravity = 0.9
  let isGameOver = false

  function control(e) {
    if (e.keyCode === 40) {
      if (isJumping === false) {
        isJumping = true
        jump()
      }
    }
  }
  document.addEventListener('keyup', control)

  let position = 0
  function jump() {
    console.log('up')
    let count = 0
    let timerId = setInterval(function () {

      //move down
      if (count === 15) {
        clearInterval(timerId)
        console.log('down')
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId)
            isJumping = false
          }
          position -= 12.95
          count--
          postiion = position * gravity
          dino.style.bottom = position + 'px'
        }, 20)
      }
      //move up
      position += 30
      count++
      position = position * gravity
      dino.style.bottom = position + 'px'
    }, 20)
  }


  function generateObstacles() {
    let randomTime = Math.random() * 4000
    let obstaclePosition = 1000
    const obstacle = document.createElement('div')
    if (!isGameOver) obstacle.classList.add('obstacle')
    grid.appendChild(obstacle)
    obstacle.style.left = obstaclePosition + 'px'

    let timerId = setInterval(function () {
      //check for collision
      if(obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
        clearInterval(timerId)
        isGameOver = true
        alert.innerHTML ='game Over'
        //remove all children
        while (grid.firstChild) {
          grid.removeChild(grid.lastChild)
        }
      }
      obstaclePosition -= 10
      obstacle.style.left = obstaclePosition + 'px'
    }, 20)
    if (!isGameOver) setTimeout(generateObstacles, randomTime)
  }
  generateObstacles()
  
})