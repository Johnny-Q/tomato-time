const {ipcRenderer} = require('electron');
var params = {
    "wm": 0,
    "ws": 0,
    "bm": 0,
    "bs": 0,
    "lm": 0,
    "ls": 0
}
var curMins = 0;
var curSecs = 0;
var timerFunc;
var getID = document.getElementById;

var inMin = document.getElementsByName("minutes");
var inSec = document.getElementsByName("seconds");
var audio = document.getElementsByTagName("audio")[0];

var inputs = document.getElementsByTagName("input");

var type = 0;

var rounds = 0;
var maxRounds = 4;

console.log(inputs);


for (var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute("maxlength", "2");
    inputs[i].setAttribute("tabindex", i);
}

var prev0Element;
document.body.onkeyup = function (e) {
    var element = e.srcElement || e.target;
    var max = parseInt(element.getAttribute("maxlength"), 10);
    var currLength = element.value.length;

    //validate the keyinput
    element.value = element.value.match(/[\d]*/);

    
    if (currLength >= max) {
        var next = parseInt(element.getAttribute("tabindex"), 10) + 1;
        if (next < inputs.length) {
            inputs[next].focus();
        }
        prev0Element = null;
    } else if (currLength == 0) {
        if (prev0Element && prev0Element === element) {
            var prev = parseInt(element.getAttribute("tabindex"), 10) - 1;
            if (prev > -1) {
                inputs[prev].focus();
            }
        }
        prev0Element = element;
    }
}

function startTimer() {
    var counter = 0;
    for (var key of Object.keys(params)) {
        params[key] = parseInt(inputs[counter].value);
        counter++;
    }
    console.log(params);
    var curMins = params.wm;
    var curSecs = params.ws;
    timerFunc = setInterval(function () {
        //subtract a second
        if (curSecs > 0) {
            curSecs--;
        } else {
            curMins--;
            curSecs = 59;
        }

        //prefix a 0 if there
        inMin[type].value = prefixIfNeeded(curMins);
        inSec[type].value = prefixIfNeeded(curSecs);
        
        if (curMins < 0) {
            switch (type) {
                case 0:
                    ipcRenderer.send("done-work", "reee");
                    //reset the timer
                    curMins = params.wm;
                    curSecs = params.ws;
                    inMin[type].value = prefixIfNeeded(curMins);
                    inSec[type].value = prefixIfNeeded(curSecs);

                    if (rounds >= maxRounds) {
                        curSecs = params.ls;
                        curMins = params.lm;
                        type = 2;
                        break;
                    }
                    curSecs = params.bs;
                    curMins = params.bm;
                    type = 1;
                    rounds++;
                    break;
                case 1:
                    //reset the timer
                    curMins = params.bm;
                    curSecs = params.bs;
                    inMin[type].value = prefixIfNeeded(curMins);
                    inSec[type].value = prefixIfNeeded(curSecs);

                    curSecs = params.ws;
                    curMins = params.wm;
                    type = 0;
                    break;
                case 2:
                    curMins = params.lm;
                    curSecs = params.ls;
                    inMin[type].value = prefixIfNeeded(curMins);
                    inSec[type].value = prefixIfNeeded(curSecs);

                    curSecs = params.ws;
                    curMins = params.wm;
                    type = 0;
                    rounds = 0;
                    break;
            }
            audio.currentTime = 0;
            audio.play();
        }

        //update text
    }, 1000);
}
function pauseTimer() {
    clearInterval(timerFunc);
}


function prefixIfNeeded(val){
    var msg = "";
    if(val < 10){
        msg += "0";
    }
    msg += val.toString();
    return msg;
}

class Timer{}