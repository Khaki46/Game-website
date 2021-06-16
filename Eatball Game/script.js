const gameBox = document.getElementById('Gamebox');
const canvas = document.querySelector('canvas');
/** @type {CanvasRenderingContext2D} */

const ctx = canvas.getContext('2d');

const Width = gameBox.offsetWidth;
const Height = gameBox.offsetHeight;

function random(min, max) {
    return Math.floor(Math.random()*(max-min)) + min;
}
function randomColor() {
    return 'rgb(' +
    random(0, 255) + ', ' +
    random(0, 255) + ', ' +
    random(0, 255) + ')';
}

function Ball(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
}
Ball.prototype.draw = () => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
}
let balls = [];
while (balls.length < 10) {
    let size = random(10, 25);
    let ball = new Ball(
        random(0 + size, Width - size),
        random(0 + size, Height - size),
        randomColor(),
        size
    );
    balls.push(ball);
}
function loop() {  
    for (let index = 0; index < balls.length; index++) {
        balls[index].draw();        
    }
    requestAnimationFrame(loop);
}
loop();