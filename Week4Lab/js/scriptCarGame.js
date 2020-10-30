//JavaScript goes here

var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

var mario = new Image();
mario.src = 'images/mario.png';

var x = 0;
var y = 0;

//Timer
var timer = requestAnimationFrame(main)

//variable for starting and finish line
var start = 110;
var finish = 700;

//fuel variables
var startFuel = 550;
var fuel = startFuel;
var barFullWidth = 300;

//start timer
var seconds = 3;
var framesPerSecond = 60;
var frames = framesPerSecond;

function main(){
    timer=requestAnimationFrame(main)
    ctx.clearRect(0, 0, 800, 600);

    //draw game objects
    drawFuelBar();
    drawFuelText();
    drawStartLine();
    drawFinishLine();
    drawBox();
    drawSprite();

    if(seconds > 0){
        runStartTimer();
        drawStartTimer();
    }
    else{
        if (fuel>0){
            x += 1;
            fuel-=1;
        }
    }

    //draw some text
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'blue';
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Week 4 Lab", c.width/2, 50);
    ctx.strokeText("Week 4 Lab", c.width/2, 50);

    if(fuel <=0 || x +100 >finish){
        drawResults();
    }

}

function drawBox(){
    ctx.fillStyle = 'purple';
    ctx.fillRect(x, c.height/2, 100, 50)
}

function drawSprite(){
    ctx.drawImage(mario, x, 110, 100, 100);
}

function drawStartLine(){
    ctx.fillStyle= 'red';
    ctx.fillRect(start, 100, 10, 400);
}

function drawFinishLine(){
    ctx.fillStyle= 'blue';
    ctx.fillRect(finish, 100, 10, 400);
}

function drawFuelBar(){
    var barCurrentWidth = barFullWidth * getFuelPercentage();

    ctx.fillStyle= 'Orange';
    ctx.fillRect(start, 80, barCurrentWidth, 10);
}

function drawFuelText(){
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText(fuel, start, 60);
}

function getFuelPercentage(){
    return fuel/startFuel;
}

function drawResults(){
    if(x +100 > finish){
        //winning condition
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('You made it to the finish line.\n YOU WON!!!', c.width/2,c.height/2);
    }
    else{
        //losing condition
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('You ran out of fuel.\n YOU LOSE :(', c.width/2,c.height/2);
    }
}

function runStartTimer(){
    frames -=1;
    if(frames < 0){
        frames=framesPerSecond;
        seconds -= 1;
    }
}

function drawStartTimer(){
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(seconds, c.width/2,c.height/2);
}

//main();