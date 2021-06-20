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

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}
function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);

Ball.prototype = {
  constructor: Ball,
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  },
  update() {
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
  },
  collisionDetect() {
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
}
function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);
  this.color = 'white';
  this.size = 10;
}
EvilCircle.prototype = Object.create(Shape.prototype);

let useMouse = false;

EvilCircle.prototype = {
  constructor: EvilCircle,
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  },
  checkBounds() {
    if((this.x + this.size) >= Width) {
      this.x -= this.size;
    }
    
    if((this.x - this.size) <= 0) {
      this.x += this.size;
    }
    
    if((this.y + this.size) >= Height) {
      this.y -= this.size;
    }
    
    if((this.y - this.size) <= 0) {
      this.y += this.size;
    }    
  },
  setControls() {
    window.onkeydown = e => {
      switch(e.key) {
        case 'a':
          this.x -= this.velX;
          break;
        case 'd':
          this.x += this.velX;
          break;
        case 'w':
          this.y -= this.velY;
          break;
        case 's':
          this.y += this.velY;
          break;
        }
      };
      window.onmousedown = e => {
        this.x = e.offsetX;
        this.y = e.offsetY;
        useMouse = true;
      }
      window.onmousemove = e =>{
        if (useMouse === true) {
          this.x = e.offsetX;
          this.y = e.offsetY;  
        }
      }
      window.onmouseup = () => {
        useMouse = false;
      }    
  },
  collisionDetect() {
    for (let index = 0; index < balls.length; index++) {
      if (balls[index].exists) {
        const dx = this.x - balls[index].x;
        const dy = this.y - balls[index].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.size + balls[index].size) {
          balls[index].exists = false;
        }
      }
    }    
  }
}
let balls = [];
while (balls.length < 25) {
    let size = random(10, 25);
    let ball = new Ball(
        random(0 + size, Width - size),
        random(0 + size, Height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        randomColor(),
        size
      );
    balls.push(ball);
}
let evi = new EvilCircle(Width / 2, Height / 2, true);
evi.setControls();

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, Width, Height);
    for (let index = 0; index < balls.length; index++) {
      if (balls[index].exists) {
        balls[index].draw();
        balls[index].update();
        balls[index].collisionDetect();
      }
    }
  evi.draw();
  evi.checkBounds();
  evi.collisionDetect();

  requestAnimationFrame(loop);
  }
loop();