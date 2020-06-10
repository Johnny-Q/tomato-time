//electron stuff
const { ipcRenderer } = require("electron");
// function sendData() {
//     ipcRenderer.send("check-in", document.getElementById("asdf").value);
// }

var modal = document.getElementById("modal");
var sBtn = document.getElementById("submit");
var stars = document.getElementsByClassName("star");

var currStar = 0;
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
            for(var i=4 ; i >= 0; i--){
                stars[i].style.borderBottom = "none";
            }
            //check if we are trying to deselect
            if(currStar == x){
                currStar = 0;
            }//apply underline the border for each star below it
            else{
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

    //reset the modal
    //  clear the stars
    //  clear the text area
    //display toast?
}
