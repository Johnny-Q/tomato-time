//electron stuff
const { ipcRenderer } = require("electron");
// function sendData() {
//     ipcRenderer.send("check-in", document.getElementById("asdf").value);
// }

var modal = document.getElementById("modal");
var sBtn = document.getElementById("submit");
var stars = document.getElementsByClassName("star");

var currStar = 0;
var startTime = 0;
window.onclick = function (event) {
    //close the modal if we click outside of its content
    if (event.target == modal) {
        modal.style.display = "none";
    }
    //add functionality to the stars
    else if (event.target.nodeName == "BUTTON") {
        var x = parseInt(event.target.innerHTML);
        if(x !== NaN){
            //first clear all borders
            clearStarBorders();
            //check if we are trying to deselect
            if(currStar != x){
                currStar = x;
                x-=1;
                for(; x >= 0; x--){
                    stars[x].style.borderBottom = "1px solid black";
                }
            }
        }
    }
}

sBtn.onclick = function (event) {
    //close the modal
    modal.style.display = "none";

    //submit data
    var input = document.getElementById("reflection");
    var data = {
        'stars': currStar,
        'reflection': input.value,
        'time_since_start': Date.now()-startTime
    };
    ipcRenderer.send("check-in", data);
    
    //reset the modal
    //  clear the stars
    clearStarBorders();
    //  clear the text area
    document.getElementById("reflection").value = "";

    //display toast?
}


function clearStarBorders(){
    for(var i=4 ; i >= 0; i--){
        stars[i].style.borderBottom = "none";
    }
    currStar = 0;
}