var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
    }, scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config)
var xVelocity
var yVelocity
var lastReverse = null

function preload() {
  this.load.image("player", "player.png")
  this.load.image("emptyVertical", "empty-vertical.png")
  this.load.image("emptyHorizontal", "empty-horizontal.png")
}

function create() {
  walls = this.physics.add.staticGroup()

  walls.create(0, 300, "emptyVertical")
  walls.create(800, 300, "emptyVertical")

  walls.create(400, 0, "emptyHorizontal")
  walls.create(400, 600, "emptyHorizontal")

  player = this.physics.add.sprite(400, 300, "player")

  this.physics.add.collider(player, walls, hitWall, null, this)

  xVelocity = 500
  yVelocity = 500
}

function timeoutCheck() {
  if (lastReverse != null) {
    if (Date.now() - lastReverse >= 1000) {
      xVelocity = 0 - xVelocity
      lastReverse = Date.now()
      return true
    } else {
      return false
    }
  } else {
    xVelocity = 0 - xVelocity
    lastReverse = Date.now()
    return true
  }
}

function update() {
  player.setVelocityX(xVelocity)
  player.setVelocityY(yVelocity)

  player.angle += 3

  cursors = this.input.keyboard.createCursorKeys()

  if (cursors.left.isDown) {
    if (timeoutCheck()) {
      xVelocity = 0 - xVelocity
    }
  }

  if (cursors.right.isDown) {
    if (timeoutCheck()) {
      yVelocity = 0 - yVelocity
    }
  }
}

function hitWall(player, wall) {
  if (wall.y == 300) {
    xVelocity = 0 - xVelocity
  } else {
    yVelocity = 0 - yVelocity
  }
  player.setVelocityX(-300)
  player.setVelocityY(150)
}
