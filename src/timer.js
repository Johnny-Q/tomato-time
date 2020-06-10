

class Timer{
    constructor(minElement, secElement, min, sec){
        this.minElement = minElement;
        this.secElement = secElement;
        this.min = min;
        this.maxMin = min;
        this.sec = sec;
        this.maxSec = sec;
    }

    startTimer(){
        //mark the input fields as read only
        this.minElement.setAttribute("readonly", "");
        this.secElement.setAttribute("readonly", "");

        var _this = this;
        this.timerFunc = setInterval(function(){
            //stop if timer is done
            if(_this.min == 0 && _this.sec == 0){
                _this.stopTimer(); _this.resetTimer(); switchTimers();
                return;
            //subtract from minutes if we cannot subtract from seconds
            }else if(_this.sec == 0){
                _this.min--;
                _this.sec = 60;
            }
            //subtract from seconds
            _this.sec--;
            _this.renderVals(_this.min, _this.sec);
        }, 1000);
    }

    stopTimer(){
        this.minElement.removeAttribute("readonly");
        this.secElement.removeAttribute("readonly");
        clearInterval(this.timerFunc);
    }

    resetTimer(){
        this.min = this.maxMin;
        this.sec = this.maxSec;
    }

    renderVals(m, s){
        var min = m.toString();
        var sec = s.toString();
        if(sec.length <  2){
            sec = "0" + sec;
        }
        this.minElement.value = min;
        this.secElement.value = sec;
    }

    setMaxTime(m, s){
        this.maxMin = m;
        this.maxSec = s;
    }
}
//remove alpha characters from input
function isValid(event){
    var keycode = event.keyCode;
    if(48 <= keycode && keycode <= 57){
        return true;
    }
    return false;
}

var minElement = document.querySelector("input[name='min']");
var secElement = document.querySelector("input[name='sec']");
var audio = document.querySelector("audio");

var work = new Timer(minElement, secElement, 0, 2);
var rest = new Timer(minElement, secElement, 0, 3);
var longRest = new Timer(minElement, secElement, 0, 4);

var timers = [work, rest, longRest];

var currentTimer = 0;
var roundCount = 0;
var breakRounds = 2;
var isWorking = true;
work.startTimer();
startTime = Date.now();

function switchTimers(){
    //open model after work sess completed
    if(currentTimer == 0){
        modal.style.display = "block";
    }

    //change the text
    
    //play the audio
    audio.play();

    //start the next timer
    if(roundCount == breakRounds){
        currentTimer = 2;
        roundCount = 0;
    }else{
        //increase the value of round count if we completed a round
        //if currently on work the round count will not increase because work == 0
        roundCount+=currentTimer;

        //alternate between work and break timers
        currentTimer = currentTimer == 0 ? 1 : 0;
    }
    timers[currentTimer].renderVals(timers[currentTimer].maxMin, timers[currentTimer].maxSec);
    timers[currentTimer].startTimer();
    console.log(currentTimer, roundCount);
}
