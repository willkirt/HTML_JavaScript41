window.onload = function(){

var c = document.querySelector('canvas');
var ctx = c.getContext('2d');
var timer = requestAnimationFrame(main);
var gravity = 1;

function randomRange(high, low){
    return Math.random() * (high-low) + low;
}

function GameObject(){
    this.radius = randomRange(5, 2);
    this.color = `rgb(${randomRange(200,25)},${randomRange(200,25)},${randomRange(200,25)})`;
    this.x = c.width/2//Math.random()*c.width;
    this.y = c.height/2//Math.random()*c.height;
    this.vx = randomRange(3, -3);
    this.vy = randomRange(3, -3)//this.radius;

    this.drawCircle = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }

    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.y > c.height - this.radius || this.y < 0 + this.radius){
            //this.y = 0 - this.radius;
            //this.y = c.height - this.radius;
            this.vy = - this.vy * .9;
        }

        if(this.x > c.width - this.radius || this.x < 0 + this.radius){
            //this.y = 0 - this.radius;
            //this.x = c.width - this.radius;
            this.vx = - this.vx * .8;
        }

    }
}

var particles = [];
var numberOfParticles = 10000;

for(var i = 0; i<numberOfParticles; i++){
    particles[i] = new GameObject();
    particles[i].drawCircle();
}

function main(){
    //clear the canvas
    ctx.clearRect(0,0,c.width,c.height)

    for(var i = 0; i<particles.length; i++){
        //particles[i].vy += gravity;
        //update the position
        particles[i].move();
        //draw the circles
        particles[i].drawCircle();
    }
    timer = requestAnimationFrame(main);
}
}