window.onload = function(){
    var rps = ['rock', 'paper', 'scissors'];
    var c = document.querySelector('canvas');
    var ctx = c.getContext('2d');

    //Create an array of buttons
    var btn = document.querySelectorAll('a');
    //assign event listeners to the buttons
    btn[0].addEventListener('click', function(e){play(0)})
    btn[1].addEventListener('click', function(e){play(1)})
    btn[2].addEventListener('click', function(e){play(2)})

        function win(){
            ctx.fillStyle = 'green';
            ctx.font = '60px Havetical';
            ctx.textAlign = 'center';
            ctx.fillText('You won.', c.width/2, c.height/2);
        }
    
        function lose(){
            ctx.fillStyle = 'red';
            ctx.font = '60px Havetical';
            ctx.textAlign = 'center';
            ctx.fillText('You lost.', c.width/2, c.height/2);
        }
    
        function tie(){;
            ctx.fillStyle = 'lightblue';
            ctx.font = '60px Havetical';
            ctx.textAlign = 'center';
            ctx.fillText('It\'s a tie.', c.width/2, c.height/2);
        }
    
        function play(playersChoice){
            var cpuChoice = Math.floor(Math.random() * 2.999);
            ctx.clearRect(0,0,c.width,c.height)
            ctx.fillStyle = 'grey';
            ctx.fillRect(0,0,c.width,c.height);
            ctx.fillStyle= 'aquamarine'
            ctx.font = '45px Arial'
            ctx.textAlign = 'center';
            ctx.fillText('You chose '+rps[playersChoice]+'.\n The computer chooses '+rps[cpuChoice]+'.',c.width/2, c.height/4, 950);
    
            switch(playersChoice){
                case 0:
                    if(cpuChoice === 0){
                        tie();
                    }
                    else if(cpuChoice === 1){
                        lose();
                    }
                    else{
                        win();
                    }
                break;
                case 1: 
                    if(cpuChoice === 0){
                        win();
                    }
                    else if(cpuChoice === 1){
                        tie();
                    }
                    else{
                        lose();
                    }
                break;
                case 2: 
                    if(cpuChoice === 0){
                        lose();
                    }
                    else if(cpuChoice === 1){
                        win();
                    }
                    else{
                        tie();
                    }
                break;
        }
    }
}