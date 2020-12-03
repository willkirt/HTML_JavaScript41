window.onload = function(){
    var c = document.querySelector('canvas');
    var ctx = c.getContext('2d');

    var rock = new Image();
    var paper = new Image();
    var scissors = new Image();
    var lizard = new Image();
    var spock = new Image();
    var hrock = new Image();
    var hpaper = new Image();
    var hscissors = new Image();
    var hlizard = new Image();
    var hspock = new Image();

    rock.src = 'images/Rock.jpg';
    paper.src = 'images/Paper.jpg';
    scissors.src = 'images/Scissors.jpg';
    lizard.src = 'images/Lizard.jpg';
    spock.src = 'images/Spock.jpg';

    hrock.src = 'images/XRock.jpg';
    hpaper.src = 'images/XPaper.jpg';
    hscissors.src = 'images/XScissors.jpg';
    hlizard.src = 'images/XLizard.jpg'
    hspock.src = 'images/XSpock.jpg';

    hscissors.onload = function(){
        draw(rock, paper, scissors,lizard, spock, rock, paper, scissors, lizard, spock);
    }

    var results = 'pick an option from the buttons above';

    var rps = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

    //Create an array of buttons
    var btn = document.querySelectorAll('a');
    //assign event listeners to the buttons
    btn[0].addEventListener('click', function(e){play(0)})
    btn[1].addEventListener('click', function(e){play(1)})
    btn[2].addEventListener('click', function(e){play(2)})
    btn[3].addEventListener('click', function(e){play(3)})
    btn[4].addEventListener('click', function(e){play(4)})

        function win(){
            results = 'You win!!!';
        }
    
        function lose(){
            results = 'You lose :(';
        }
    
        function tie(){;
            results = 'It\s a tie!';
        }
    
        function play(playersChoice){
            var cpuChoice = Math.floor(Math.random() * 4.999);
            ctx.clearRect(0,0,c.width,c.height)
            ctx.fillRect(0,0,c.width,c.height);
    
            switch(playersChoice){
                case 0:
                    if(cpuChoice === 0){
                        tie()
                        draw(hrock, paper, scissors, lizard, spock, hrock, paper, scissors, lizard, spock)
                    }
                    else if(cpuChoice === 1){
                        lose()
                        draw(hrock, paper, scissors, lizard, spock, rock, hpaper, scissors, lizard, spock)
                    }
                    else if(cpuChoice === 2){
                        win()
                        draw(hrock, paper, scissors, lizard, spock, rock, paper, hscissors, lizard, spock)
                    }
                    else if(cpuChoice === 3){
                        win()
                        draw(hrock, paper, scissors, lizard, spock, rock, paper, scissors, hlizard, spock)
                    }
                    else{
                        lose()
                        draw(hrock, paper, scissors, lizard, spock, rock, paper, scissors, lizard, hspock)
                    }
                break;
                case 1:
                    if(cpuChoice === 0){
                        win()
                        draw(rock, hpaper, scissors, lizard, spock, hrock, paper, scissors, lizard, spock)
                    }
                    else if(cpuChoice === 1){
                        tie()
                        draw(rock, hpaper, scissors, lizard, spock, rock, hpaper, scissors, lizard, spock)
                    }
                    else if(cpuChoice === 2){
                        lose()
                        draw(rock, hpaper, scissors, lizard, spock, rock, paper, hscissors, lizard, spock)
                    }
                    else if(cpuChoice === 3){
                        lose()
                        draw(rock, hpaper, scissors, lizard, spock, rock, paper, scissors, hlizard, spock)
                    }
                    else{
                        win()
                        draw(rock, hpaper, scissors, lizard, spock, rock, paper, scissors, lizard, hspock)
                    }
                break;
                case 2:
                    if(cpuChoice === 0){
                        lose()
                        draw(rock, paper, hscissors, lizard, spock, hrock, paper, scissors, lizard, spock)
                    }
                    else if(cpuChoice === 1){
                        win()
                        draw(rock, paper, hscissors, lizard, spock, rock, hpaper, scissors, lizard, spock)
                    }
                    else if(cpuChoice === 2){
                        tie()
                        draw(rock, paper, hscissors, lizard, spock, rock, paper, hscissors, lizard, spock)
                    }
                    else if(cpuChoice === 3){
                        win()
                        draw(rock, paper, hscissors, lizard, spock, rock, paper, scissors, hlizard, spock)
                    }
                    else{
                        lose()
                        draw(rock, paper, hscissors, lizard, spock, rock, paper, scissors, lizard, hspock)
                    }
                break;
                case 3:
                    if(cpuChoice === 0){
                        lose()
                        draw(rock, paper, scissors, hlizard, spock, hrock, paper, scissors, lizard, spock)
                    }
                    else if(cpuChoice === 1){
                        win()
                        draw(rock, paper, scissors, hlizard, spock, rock, hpaper, scissors, lizard, spock)
                    }
                    else if(cpuChoice === 2){
                        lose()
                        draw(rock, paper, scissors, hlizard, spock, rock, paper, hscissors, lizard, spock)
                    }
                    else if(cpuChoice === 3){
                        tie()
                        draw(rock, paper, scissors, hlizard, spock, rock, paper, scissors, hlizard, spock)
                    }
                    else{
                        win()
                        draw(rock, paper, scissors, hlizard, spock, rock, paper, scissors, lizard, hspock)
                    }
                break;
                case 4:
                    if(cpuChoice === 0){
                        win()
                        draw(rock, paper, scissors, lizard, hspock, hrock, paper, scissors, lizard, spock)
                    }
                    else if(cpuChoice === 1){
                        lose()
                        draw(rock, paper, scissors, lizard, hspock, rock, hpaper, scissors, lizard, spock)
                    }
                    else if(cpuChoice === 2){
                        win()
                        draw(rock, paper, scissors, lizard, hspock, rock, paper, hscissors, lizard, spock)
                    }
                    else if(cpuChoice === 3){
                        lose()
                        draw(rock, paper, scissors, lizard, hspock, rock, paper, scissors, hlizard, spock)
                    }
                    else{
                        tie()
                        draw(rock, paper, scissors, lizard, hspock, rock, paper, scissors, lizard, hspock)
                    }
                break;
                
        }
    }

    function draw(rock, paper, scissors, lizard, spock, crock, cpaper, cscissors, clizard, cspock){
        ctx.clearRect(0,0,c.width,c.height);
        ctx.fillRect(0,0,c.width,c.height);

        ctx.save();
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText('Player Choice', c.width/2, 100);
        ctx.drawImage(rock, c.width/2 -200 - rock.width/2, 150)
        ctx.drawImage(paper, c.width/2 -100 - paper.width/2, 150)
        ctx.drawImage(scissors, c.width/2  - scissors.width/2, 150)
        ctx.drawImage(lizard, c.width/2 +100 - lizard.width/2, 150)
        ctx.drawImage(spock, c.width/2 +200 - spock.width/2, 150)

        ctx.fillText('Computer Choice', c.width/2, 325);
        ctx.drawImage(crock, c.width/2 -200 - rock.width/2, 375)
        ctx.drawImage(cpaper, c.width/2 -100 - paper.width/2, 375)
        ctx.drawImage(cscissors, c.width/2 - scissors.width/2, 375)
        ctx.drawImage(clizard, c.width/2 +100 - lizard.width/2, 375)
        ctx.drawImage(cspock, c.width/2 +200 - spock.width/2, 375)

        //Display results
        ctx.font = '30px Permanent Marker';
        ctx.textAlign = 'center';
        ctx.fillText(results, c.width/2, 525);

        ctx.restore();
    }
}