var minutes = 15;
var seconds = 0;
var timer;

function startTimer() {
    timer = setInterval(function () {
        //subtract a second
        if (seconds > 0) {
            seconds--;
        } else {
            minutes--;
            seconds = 59;
        }
        //update text
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
    }, 1000);
}
function pauseTimer() {
    clearInterval(timer);
}