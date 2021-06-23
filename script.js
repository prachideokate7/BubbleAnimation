const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colours = [
    'red',
    'blue',
    'yellow',
    'green',
];
const maxSize = 35;
const minSize = 0;
// mouse position ///////////////////////////////
let mouse = {
    x: null,
    y: null
}
window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        //console.log(mouse);
    });
// create constructor function for particle
function Particle(x, y, directionX, directionY, size, colour) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.colour = colour;
}
// add draw method to particle prototype
Particle.prototype.draw = function () {

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    //ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = this.colour;
    ctx.fill();
}
// add update method to particle prototype
Particle.prototype.update = function () {
    if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0) {
        this.directionX = -this.directionX;
    } if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
        this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;


    // mouse interactivity
    let mouseRadius = 50;
    if (mouse.x - this.x < mouseRadius
        && mouse.x - this.x > -mouseRadius
        && mouse.y - this.y < mouseRadius
        && mouse.y - this.y > -mouseRadius) {
        if (this.size < maxSize) {
            this.size += 3;
            this.x -= 0;
        }
    }
    else if (this.size > minSize) {
        this.size -= .1;
    }
    if (this.size < 0) {
        this.size = 0;
    }
    this.draw();
}
// create particle array 
function init() {
    particleArray = [];
    console.log(colours[Math.floor(Math.random() * colours.length)]);
    for (let i = 0; i < 1000; i++) {
        let size = 0;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        let colour = colours[Math.floor(Math.random() * colours.length)];
        particleArray.push(new Particle(x, y, directionX, directionY, size, colour));
    }
}
// animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}
init();
animate();


// 1) RESIZE SETTING - empty and refill particle array every time window changes size + change canvas size
window.addEventListener('resize',
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    }
);

// 2) SET MOUSE POSITION AS UNDEFINED EVERY 1 SEC(to prevent effect getting stuck in corners when mouse leaves window)//////
setInterval(function () {
    // NULL WONT WORK AS IF IT COERCE INTO POSITION 0 and draw all particle in the corner
    mouse.x = undefined;
    mouse.y = undefined;
}, 10000);