// Sidebar hide and view

var bar = document.getElementById("nav-links"); 
function showMenu() {
    bar.style.right = "0px";   //visible
    console.log("it worked");  //for developer message
}
function hideMenu(){
    bar.style.right = "-200px";  //out of screen 
}
console.log(bar);