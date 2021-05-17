"use strict";



let pluppar = document.getElementsByClassName("plupp");

for (var i = 0; i < pluppar.length; i++) {    
    pluppar[i].style.display = "flex";
    pluppar[i].style.position = "absolute";  
}



let circle = document.getElementsByClassName("question")[0];

var circleRadius = circle.clientWidth/2;
var pluppRadius = 35;
var midPoint = circle.parentElement.parentElement.clientWidth/2;


var w = window.innerWidth;
var h = window.innerHeight;

var wHalf = w/2;
var hHalf = h/2;



circle.style.left = midPoint - circleRadius +"px"
circle.style.top = midPoint - circleRadius + "px";

function aroundPerimiter(startx, starty) {

    var startxTemp = startx;
    var startyTemp = starty -3;
    
    pluppar[0].style.top = startyTemp + "px";
    pluppar[0].style.left = startxTemp + "px";

    var lastTop = pluppar[0].style.top.split("p")[0];
    var lastLeft = pluppar[0].style.left.split("p")[0];
    
    pluppar[1].style.top = Number(lastTop) +7 + Math.cos(radToDeg(36))*320 +  "px";
    pluppar[1].style.left = Number(lastLeft)  + Math.sin(radToDeg(36))*160 +  "px";    

    lastTop = pluppar[1].style.top.split("p")[0];
    lastLeft = pluppar[1].style.left.split("p")[0];
    
    pluppar[2].style.top = Number(lastTop) + Math.cos(radToDeg(36))*640 +  "px";
    pluppar[2].style.left = Number(lastLeft) +3  + Math.sin(radToDeg(36))*80 +  "px"; 

    lastTop = pluppar[2].style.top.split("p")[0];
    lastLeft = pluppar[2].style.left.split("p")[0];


    pluppar[3].style.top = startyTemp -2*circleRadius - 2*pluppRadius + "px";
    pluppar[3].style.left = startxTemp + "px";

    lastTop = pluppar[3].style.top.split("p")[0];
    lastLeft = pluppar[3].style.left.split("p")[0];
    
    pluppar[4].style.top = Number(lastTop) -5 - + Math.cos(radToDeg(36))*320 +  "px";
    pluppar[4].style.left = Number(lastLeft)  + Math.sin(radToDeg(36))*160 +  "px";    

    lastTop = pluppar[4].style.top.split("p")[0];
    lastLeft = pluppar[4].style.left.split("p")[0];
    
    pluppar[5].style.top = Number(lastTop) - Math.cos(radToDeg(36))*640 +  "px";
    pluppar[5].style.left = Number(lastLeft) +3  + Math.sin(radToDeg(36))*80 +  "px"; 

    lastTop = pluppar[3].style.top.split("p")[0];
    lastLeft = pluppar[3].style.left.split("p")[0];    

    // pluppar[6].style.backgroundColor = "purple";
    // pluppar[6].style.top = Number(lastTop) + "px";
    // pluppar[6].style.left = startxTemp + "px";

    // lastTop = pluppar[6].style.top.split("p")[0];
    // lastLeft = pluppar[6].style.left.split("p")[0];
    
    pluppar[6].style.top = Number(lastTop) -5 - Math.cos(radToDeg(36))*320 +  "px";
    pluppar[6].style.left = Number(lastLeft)  - Math.sin(radToDeg(36))*160 +  "px";    

    lastTop = pluppar[6].style.top.split("p")[0];
    lastLeft = pluppar[6].style.left.split("p")[0];
    
    pluppar[7].style.top = Number(lastTop) - Math.cos(radToDeg(36))*640 +  "px";
    pluppar[7].style.left = Number(lastLeft) -3  - Math.sin(radToDeg(36))*80 +  "px"; 

    lastTop = pluppar[0].style.top.split("p")[0];
    lastLeft = pluppar[0].style.left.split("p")[0];

    pluppar[8].style.top = Number(lastTop) +7 + Math.cos(radToDeg(36))*320 +  "px";
    pluppar[8].style.left = Number(lastLeft) -  Math.sin(radToDeg(36))*160 +  "px";    

    lastTop = pluppar[8].style.top.split("p")[0];
    lastLeft = pluppar[8].style.left.split("p")[0];
    
    pluppar[9].style.top = Number(lastTop) + Math.cos(radToDeg(36))*640 +  "px";
    pluppar[9].style.left = Number(lastLeft) -3  - Math.sin(radToDeg(36))*80 +  "px"; 
    
    
}

aroundPerimiter(wHalf - pluppRadius, hHalf + circleRadius);

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
};

function radToDeg(rad) {
  return rad / (Math.PI / 180);
};

window.addEventListener("resize", function(){
    w = window.innerWidth;
    h = window.innerHeight;
    wHalf = w/2;
    hHalf = h/2;
    aroundPerimiter(wHalf - pluppRadius, hHalf + circleRadius);
}, true);


function clicked(pluppNr) {
    console.log(pluppNr);
    
    var clickedPlupp = document.getElementById("plupp" + pluppNr);
    clickedPlupp.style.backgroundColor = "white";
    clickedPlupp.innerHTML = "svar";

    if (evaluateAnswer() == true) {
	points++;
    }
    
}

function evaluateAnswer () {
    return true;
}


