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

var inputs = document.getElementsByTagName("input");

var type = 0;

var rounds = 0;
var maxRounds = 4;

console.log(inputs);


for (var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute("maxlength", "2");
    inputs[i].setAttribute("tabindex", i);
}

document.body.onkeyup = function (e) {
    var element = e.srcElement || e.target;
    var max = parseInt(element.getAttribute("maxlength"), 10);
    var currLength = element.value.length;
    if (currLength >= max) {
        var next = parseInt(element.getAttribute("tabindex"), 10) + 1;
        if (next < inputs.length) {
            inputs[next].focus();
        }
    } else if (currLength == 0) {
        var prev = parseInt(element.getAttribute("tabindex"), 10) - 1;
        if (prev > -1) {
            inputs[prev].focus();
        }
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


        var msg = curMins;
        if (curMins < 10) {
            msg = "0" + curMins.toString();
        }
        inMin[type].value = msg;
        msg = curSecs;
        if (curSecs < 10) {
            msg = "0" + curSecs.toString();
        }
        inSec[type].value = msg;

        if (curMins < 0) {
            switch (type) {
                case 0:
                    curMins = params.wm;
                    curSecs = params.ws;
                    var msg = curMins;
                    if (curMins < 10) {
                        msg = "0" + curMins.toString();
                    }
                    inMin[type].value = msg;
                    msg = curSecs;
                    if (curSecs < 10) {
                        msg = "0" + curSecs.toString();
                    }
                    inSec[type].value = msg;

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
                    curMins = params.bm;
                    curSecs = params.bs;
                    var msg = curMins;
                    if (curMins < 10) {
                        msg = "0" + curMins.toString();
                    }
                    inMin[type].value = msg;
                    msg = curSecs;
                    if (curSecs < 10) {
                        msg = "0" + curSecs.toString();
                    }
                    inSec[type].value = msg;
                    curSecs = params.ws;
                    curMins = params.wm;
                    type = 0;
                    break;
                case 2:
                    curMins = params.lm;
                    curSecs = params.ls;
                    var msg = curMins;
                    if (curMins < 10) {
                        msg = "0" + curMins.toString();
                    }
                    inMin[type].value = msg;
                    msg = curSecs;
                    if (curSecs < 10) {
                        msg = "0" + curSecs.toString();
                    }
                    inSec[type].value = msg;
                    curSecs = params.ws;
                    curMins = params.wm;
                    type = 0;
                    rounds = 0;
                    break;

            }
        }

        //update text
    }, 1000);
}
function pauseTimer() {
    clearInterval(timerFunc);
}
