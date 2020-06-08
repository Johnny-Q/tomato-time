var modal = document.getElementById("modal");
var sBtn = document.getElementById("submit");

var currStar = 0;
window.onclick = function (event) {
    //close the modal if we click outside of its content
    if (event.target == modal) {
        modal.style.display = "none";
    }
    //add functionality to the stars
    else if(event.target.nodeName == "BUTTON"){
        
    }
}

sBtn.onclick = function(event){
    //close the modal
    modal.style.display = "none";

    //submit data
    
    //display toast?
}
