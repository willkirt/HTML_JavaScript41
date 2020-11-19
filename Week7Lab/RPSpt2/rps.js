window.onload = function(){
    var c = document.querySelector('canvas');
    var ctx = c.getContext('2d');

    var rock = new Image();
    var paper = new Image();
    var scissors = new Image();
    var hrock = new Image();
    var hpaper = new Image();
    var hscissors = new Image();

    rock.src = 'images/rock.jpg';
    paper.src = 'images/paper.jpg';
    scissors.src = 'images/scissors.jpg';

    hrock.src = 'images/rock2.jpg';
    hpaper.src = 'images/paper2.jpg';
    hscissors.src = 'images/scissors2.jpg';

    hscissors.onload = function(){
        draw(rock, paper, scissors, rock, paper, scissors);
    }

    var results = 'pick an option from the buttons above';

    var rps = ['rock', 'paper', 'scissors'];

    //Create an array of buttons
    var btn = document.querySelectorAll('a');
    //assign event listeners to the buttons
    btn[0].addEventListener('click', function(e){play(0)})
    btn[1].addEventListener('click', function(e){play(1)})
    btn[2].addEventListener('click', function(e){play(2)})

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
            var cpuChoice = Math.floor(Math.random() * 2.999);
            ctx.clearRect(0,0,c.width,c.height)
            ctx.fillRect(0,0,c.width,c.height);
    
            switch(playersChoice){
                case 0:
                    if(cpuChoice === 0){
                        tie();
                        draw(hrock, paper, scissors, hrock, paper, scissors)
                    }
                    else if(cpuChoice === 1){
                        lose();
                        draw(hrock, paper, scissors, rock, hpaper, scissors)
                    }
                    else{
                        win();
                        draw(hrock, paper, scissors, rock, paper, hscissors)
                    }
                break;
                case 1: 
                    if(cpuChoice === 0){
                        win();
                        draw(rock, hpaper, scissors, hrock, paper, scissors)
                    }
                    else if(cpuChoice === 1){
                        tie();
                        draw(rock, hpaper, scissors, rock, hpaper, scissors)
                    }
                    else{
                        lose();
                        draw(rock, hpaper, scissors, rock, paper, hscissors)
                    }
                break;
                case 2: 
                    if(cpuChoice === 0){
                        lose();
                        draw(rock, paper, hscissors, hrock, paper, scissors)
                    }
                    else if(cpuChoice === 1){
                        win();
                        draw(rock, paper, hscissors, rock, hpaper, scissors)
                    }
                    else{
                        tie();
                        draw(rock, paper, hscissors, rock, paper, hscissors)
                    }
                break;
        }
    }

    function draw(rock, paper, scissors, crock, cpaper, cscissors){
        ctx.clearRect(0,0,c.width,c.height);
        ctx.fillRect(0,0,c.width,c.height);

        ctx.save();
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText('Player Choice', c.width/2, 100);
        ctx.drawImage(rock, c.width/2 -100 - rock.width/2, 150)
        ctx.drawImage(paper, c.width/2 - paper.width/2, 150)
        ctx.drawImage(scissors, c.width/2 +100 - scissors.width/2, 150)

        ctx.fillText('Computer Choice', c.width/2, 325);
        ctx.drawImage(crock, c.width/2 -100 - rock.width/2, 375)
        ctx.drawImage(cpaper, c.width/2 - paper.width/2, 375)
        ctx.drawImage(cscissors, c.width/2 +100 - scissors.width/2, 375)

        //Display results
        ctx.font = '30px Permanent Marker';
        ctx.textAlign = 'center';
        ctx.fillText(results, c.width/2, 525);

        ctx.restore();
    }
}