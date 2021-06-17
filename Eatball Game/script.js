const gameBox = document.getElementById('Gamebox');
const canvas = document.querySelector('canvas');
/** @type {CanvasRenderingContext2D} */

const ctx = canvas.getContext('2d');

const Width = canvas.width = gameBox.offsetWidth;
const Height = canvas.height = gameBox.offsetHeight;

function random(min,max) {
    return Math.floor(Math.random()*(max-min)) + min;
  }
function randomColor() {
    return 'rgb(' +
           random(0, 255) + ', ' +
           random(0, 255) + ', ' +
           random(0, 255) + ')';
  }

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}
Ball.prototype.update = function() {
    if ((this.x + this.size) >= Width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= Height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }
  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (this !== balls[j]) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = randomColor();
        }
      }
    }
  }
let balls = [];
while (balls.length < 10) {
    let size = random(10, 25);
    let ball = new Ball(
        random(0 + size, Width - size),
        random(0 + size, Height - size),
        random(-7, 7),
        random(-7, 7),
        randomColor(),
        size
      );
    balls.push(ball);
}
function loop() {
    ctx.fillRect(0, 0, Width, Height);

    for (let index = 0; index < balls.length; index++) {
        balls[index].draw();
        balls[index].update();
        balls[index].collisionDetect();
    }
    requestAnimationFrame(loop);

  }
loop();