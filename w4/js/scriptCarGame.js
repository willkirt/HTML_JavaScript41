//JavaScript goes here

var c = document.querySelector('canvas');
var ctx = c.getContext('2d');

var walkingZs = new Image();
walkingZs.src = 'images/Zom1.png';

var walkingZs2 = new Image();
walkingZs2.src = 'images/Zom2.png';

var startLine = new Image();
startLine.src = 'images/BloodLine.png'

var bloodGauge = new Image();
bloodGauge.src = 'images/bloodGauge.png'

var x = 0;
var y = 0;

var zom1Speed = 1;
var zom2Speed = 1;

//Timer
var timer = requestAnimationFrame(main)

//variable for starting and finish line
var start = 58;
var finish = 956;

//fuel variables
var startFuel = randomRange(800, 700);
var fuel = startFuel;
var barFullWidth = 512;

//start timer
var seconds = 3;
var framesPerSecond = 60;
var frames = framesPerSecond;

var car = new GameObject();
car.y = c.height/2;

function main(){
    timer=requestAnimationFrame(main)
    ctx.clearRect(0, 0, 1024, 768);

    //draw game objects
    drawFuelBar();
    drawFuelText();
    //drawStartLine();
    //drawFinishLine();
    //drawBox();
    drawLine();
    drawSprite();
    

    if(seconds > 0){
        runStartTimer();
        drawStartTimer();
    }
    else{
        if (fuel>0 && zom1Speed < finish && zom2Speed < finish){
            zom1Speed += randomRange(3,0);
            zom2Speed += randomRange(3,0);
            fuel-=1;
        }
    }

    //draw some text
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'blue';
    ctx.font = '50px Syne Tactile';
    ctx.textAlign = 'center';
    ctx.fillText("Zombie Races", c.width/2, 50);
    ctx.strokeText("Zombie Races", c.width/2, 50);

    if(fuel <=0 || zom1Speed +56 >finish || zom2Speed +56 >finish){
        drawResults();
    }

}

function drawSprite(){
    ctx.drawImage(walkingZs, zom1Speed, 375, 58, 100);
    ctx.drawImage(walkingZs2, zom2Speed, 425, 58, 90);
}

function drawLine(){
    ctx.drawImage(startLine, 58, 393, 150, 300);
    ctx.drawImage(startLine, 946, 390, 150, 300);
}

function drawFuelBar(){
    var barCurrentWidth = barFullWidth * getFuelPercentage();

    ctx.drawImage(bloodGauge, 15, 75, 750, 25);
    ctx.fillStyle= 'black';
    ctx.fillRect(start-1, 82, barFullWidth+2, 8);
    ctx.fillStyle= 'white';
    ctx.fillRect(start, 83, barFullWidth, 6);
    ctx.fillStyle= 'red';
    ctx.fillRect(start, 83, barCurrentWidth, 6);
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
    if(zom1Speed +56 > finish || zom2Speed +56 > finish){
        //winning condition
        ctx.fillStyle = 'black';
        ctx.font = '30px Syne Tactile';
        ctx.textAlign = 'center';
        ctx.fillText('You made it to the finish line.\n YOU WON!!!', c.width/2,c.height/2);
    }
    else{
        //losing condition
        ctx.fillStyle = 'black';
        ctx.font = '30px Syne Tactile';
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