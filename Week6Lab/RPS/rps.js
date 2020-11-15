window.onload = function(){
    var rps = ['rock', 'paper', 'scissors'];

    //Create an array of buttons
    var btn = document.querySelectorAll('a');
    //assign event listeners to the buttons
    btn[0].addEventListener('click', function(e){play(0)})
    btn[1].addEventListener('click', function(e){play(1)})
    btn[2].addEventListener('click', function(e){play(2)})

    function win(){
        ctx.clearRect(0,0,c.width,c.height);
        ctx.font = '60px Havetical';
        ctx.textAlign = 'center';
        ctx.fillText('You won.');
    }

    function lose(){
        ctx.clearRect(0,0,c.width,c.height);
        ctx.font = '60px Havetical';
        ctx.textAlign = 'center';
        ctx.fillText('You lost.');
    }

    function tie(){
        ctx.clearRect(0,0,c.width,c.height);
        ctx.font = '60px Havetical';
        ctx.textAlign = 'center';
        ctx.fillText('It\'s a tie.');
    }

    function play(playersChoice){
        var cpuChoice = Math.floor(Math.random() * 2.999);
        alert('The player chooses '+rps[playersChoice]+'. \nThe  computer chooses '+rps[cpuChoice]+'.');

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
                    alert('You won.');
                    //alert('You lost.');
                    //alert('It\'s a tie.');
                }
                else if(cpuChoice === 1){
                    //alert('You won.');
                    //alert('You lost.');
                    alert('It\'s a tie.');
                }
                else{
                    //alert('You won.');
                    alert('You lost.');
                    //alert('It\'s a tie.');
                }
            break;
            case 2: 
                if(cpuChoice === 0){
                    //alert('You won.');
                    alert('You lost.');
                    //alert('It\'s a tie.');
                }
                else if(cpuChoice === 1){
                    alert('You won.');
                    //alert('You lost.');
                    //alert('It\'s a tie.');
                }
                else{
                    //alert('You won.');
                    //alert('You lost.');
                    alert('It\'s a tie.');
                }
            break;
        }
    }
}