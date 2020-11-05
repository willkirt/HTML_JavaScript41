/*
var cars = ['Honda', 'Chevy', 'Buick', 'Tesla', 'Porche'];

for (let index = 0; index < cars.length; index++) {
    console.log(cars[cars.length-1-index]);
    
}
*/
var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

var timer = requestAnimationFrame(main);

var cars = [];
var numCars = 3;

//variable for current state
var currentState = 0;
var states = [];

var winner;
var choice = 1;

speed = [1,2,3,4,5];

function GameObject(){
    this.x = 50;
    this.y = 50;
    this.w = 50;
    this.h = 50;
    this.color = 'red';
    this.speed = 1;
    this.fuel = 100;

    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    this.move = function(){
        this.x += this.speed;
    }
}

for (var index = 0; index < numCars; index++) {
    cars[index] = new GameObject();
    cars[index].x = 25; 
    speedArray = randomRange(speed.length, 1)-1;
    cars[index].speed = speed[speedArray];
    speed.splice(speedArray, 1);

}

var startLine = new GameObject();
startLine.x = 100;
startLine.w = 100;
startLine.w = 10;
startLine.h = 400;
startLine.color = 'green';

var finishLine = new GameObject();
finishLine.x = 700;
finishLine.w = 100;
finishLine.w = 10;
finishLine.h = 400;
finishLine.color = 'red';

cars[0].y = 150;
cars[1].y = 250;
cars[2].y = 350;

cars[0].w = 75;
cars[1].w = 75;
cars[2].w = 75;

cars[0].color = 'blue';
cars[1].color = 'teal';
cars[2].color = 'maroon';

//Game states

states[0] = function(){
    //Player picks winner
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0,0,c.width,c.height);
    //draw some text
    ctx.fillStyle = 'white';
    ctx.font = '60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Choose the winner!', c.width/2, c.height/2-100);
    ctx.fillText('Use keys 1, 2, or 3.', c.width/2, c.height/2+100);
}

states[1] = function(){
    //Race happens here
    for (var index = 0; index < cars.length; index++) {
        cars[index].move();
       // console.log();
        if(cars[index].x > finishLine.x){
            console.log('The winner is '+ (cars[index].color));
            winner = cars.indexOf(cars[index]);
            currentState = 2;
        }
    }
}

states[2] = function(){
    //Winner is declared here
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0,0,c.width,c.height);
    //draw some text
    ctx.fillStyle = 'white';
    ctx.font = '60px Arial';
    ctx.textAlign = 'center';
    if(winner === choice){
        ctx.fillText('The winner is '+ (winner +1).toString(), c.width/2, c.height/2-100);
        ctx.fillText('You selected the winner!', c.width/2, c.height/2+100);
        ctx.font = '30px Arial';
        ctx.fillText('Press space to play again', c.width/2, c.height/2+200);
    }
    else{
        ctx.fillText('The winner is '+ (winner +1).toString(), c.width/2, c.height/2-100);
        ctx.fillText('You chose poorly :(', c.width/2, c.height/2+100);
        ctx.font = '30px Arial';
        ctx.fillText('Press space to play again', c.width/2, c.height/2+200);
    }
}

//add an event listener
document.addEventListener('keydown', chooseWinner);
function chooseWinner(e){
    //keyboard logic goes here
    if (currentState == 0) {
        if(e.keyCode === 49){
            choice = 0;
            currentState = 1;
        }

        if(e.keyCode === 50){
            choice = 1;
            currentState = 1;
        }

        if(e.keyCode === 51){
            choice = 2;
            currentState = 1;
        }
    }
    
    if(currentState == 2){
        if(e.keyCode === 32){
            location.reload();
        }
    }
}

function main(){
    ctx.clearRect(0, 0, c.width, c.height);
    startLine.draw();
    finishLine.draw();
    for (var index = 0; index < cars.length; index++) {
        //draws the cars
        cars[index].draw();
       
    }
    states[currentState]();
    time = requestAnimationFrame(main);
}

function randomRange(high, low){
    return Math.round(Math.random()*(high - low) + low);
}