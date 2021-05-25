"use strict";


window.addEventListener('beforeunload', function (e) {
  // Cancel the event
  e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
  // Chrome requires returnValue to be set
  e.returnValue = '';
});


let players = []

//========================================================
const socket = io();

var QueryStringDecoder = (function() {
  return {
    decode: function(url) {
      var decoded = {},
          count = 0,
          pairs = url.slice(url.indexOf('?') + 1).split("&"),
          pair;

      for(; count < pairs.length; count++) {
        pair = pairs[count].split("=");
        // Missing "=" returns "null": http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
        decoded[pair[0]] = pair[1] || null;
      }

      return decoded;
  }};
})();

socket.on('message', message => {
    console.log(message);
});

socket.on('tooManyPlayers', () => {
    console.log("hej, för många spelare");
})

socket.on('question', question => {
    setQuestions(question[0], question[1]);
});

function setQuestions(question, alts) {
    console.log(question);
    console.log(alts);
    
    document.getElementById('questionId').innerHTML = question;
    for (var i = 0; i < 10; i++) {
	document.getElementById('alt' + (i+1)).innerHTML = alts[i];
    }
   
}

socket.emit('chatMessage', "hej jag tycker att korv är gott");

const { username, room } = QueryStringDecoder.decode(window.location.search);

//Join room
socket.emit('joinRoom', {username, room});

// socket.on('playerName', (name) => {
//     players.push(new Player(name));
// })

socket.on('playerName', serverPlayers => {
    for (var i = 0; i < serverPlayers.length; i++) {	
	console.log(serverPlayers[i].playerNumber);
	document.getElementById("player" + serverPlayers[i].playerNumber).childNodes[1].innerHTML = serverPlayers[i].name;
    }

});




//========================================================


let pluppar = document.getElementsByClassName("plupp");
let alts = document.getElementsByClassName('alts');

for (var i = 0; i < pluppar.length; i++) {    
    pluppar[i].style.display = "flex";
    pluppar[i].style.position = "absolute";
    alts[i].style.width = "70px"; //pluppradius == 35
    alts[i].style.height = "70px";
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

    alts[0].style.top = Number(lastTop) - 2*pluppRadius + "px";
    alts[0].style.left = Number(lastLeft) + "px";
    pluppar[1].style.top = Number(lastTop) +7 + Math.cos(radToDeg(36))*320 +  "px";
    pluppar[1].style.left = Number(lastLeft)  + Math.sin(radToDeg(36))*160 +  "px";    

    lastTop = pluppar[1].style.top.split("p")[0];
    lastLeft = pluppar[1].style.left.split("p")[0];

    alts[1].style.top = Number(lastTop) - 1.5*pluppRadius + "px";
    alts[1].style.left = Number(lastLeft) + -pluppRadius+  "px";    
    pluppar[2].style.top = Number(lastTop) + Math.cos(radToDeg(36))*640 +  "px";
    pluppar[2].style.left = Number(lastLeft) +3  + Math.sin(radToDeg(36))*80 +  "px"; 

    lastTop = pluppar[2].style.top.split("p")[0];
    lastLeft = pluppar[2].style.left.split("p")[0];

    alts[2].style.top = Number(lastTop) - 0.5*pluppRadius + "px";
    alts[2].style.left = Number(lastLeft) + -1.8*pluppRadius+  "px";    
    pluppar[3].style.top = startyTemp -2*circleRadius - 2*pluppRadius + "px";
    pluppar[3].style.left = startxTemp + "px";

    lastTop = pluppar[3].style.top.split("p")[0];
    lastLeft = pluppar[3].style.left.split("p")[0];

    alts[3].style.top = Number(lastTop) + 2*pluppRadius + "px";
    alts[3].style.left = Number(lastLeft) + "px";
    pluppar[4].style.top = Number(lastTop) -5 - + Math.cos(radToDeg(36))*320 +  "px";
    pluppar[4].style.left = Number(lastLeft)  + Math.sin(radToDeg(36))*160 +  "px";    

    lastTop = pluppar[4].style.top.split("p")[0];
    lastLeft = pluppar[4].style.left.split("p")[0];

    alts[4].style.top = Number(lastTop) + 1.5*pluppRadius + "px";
    alts[4].style.left = Number(lastLeft) + -pluppRadius+  "px"; 
    pluppar[5].style.top = Number(lastTop) - Math.cos(radToDeg(36))*640 +  "px";
    pluppar[5].style.left = Number(lastLeft) +3  + Math.sin(radToDeg(36))*80 +  "px"; 

    lastTop = pluppar[5].style.top.split("p")[0];
    lastLeft = pluppar[5].style.left.split("p")[0];    
    
    alts[5].style.top = Number(lastTop) + 0.5*pluppRadius + "px";
    alts[5].style.left = Number(lastLeft)  -1.8*pluppRadius+  "px";        
    
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

    alts[6].style.top = Number(lastTop) + 1.5*pluppRadius + "px";
    alts[6].style.left = Number(lastLeft) +pluppRadius+  "px";     
    pluppar[7].style.top = Number(lastTop) - Math.cos(radToDeg(36))*640 +  "px";
    pluppar[7].style.left = Number(lastLeft) -3  - Math.sin(radToDeg(36))*80 +  "px"; 

    lastTop = pluppar[7].style.top.split("p")[0];
    lastLeft = pluppar[7].style.left.split("p")[0];    
    
    alts[7].style.top = Number(lastTop) + 0.5*pluppRadius + "px";
    alts[7].style.left = Number(lastLeft)  +1.8*pluppRadius+  "px";        
    
    lastTop = pluppar[0].style.top.split("p")[0];
    lastLeft = pluppar[0].style.left.split("p")[0];

   
    pluppar[8].style.top = Number(lastTop) +7 + Math.cos(radToDeg(36))*320 +  "px";
    pluppar[8].style.left = Number(lastLeft) -  Math.sin(radToDeg(36))*160 +  "px";    

    lastTop = pluppar[8].style.top.split("p")[0];
    lastLeft = pluppar[8].style.left.split("p")[0];

    alts[8].style.top = Number(lastTop) - 1.5*pluppRadius + "px";
    alts[8].style.left = Number(lastLeft) +pluppRadius+  "px";     
    pluppar[9].style.top = Number(lastTop) + Math.cos(radToDeg(36))*640 +  "px";
    pluppar[9].style.left = Number(lastLeft) -3  - Math.sin(radToDeg(36))*80 +  "px"; 
    
    lastTop = pluppar[9].style.top.split("p")[0];
    lastLeft = pluppar[9].style.left.split("p")[0];
    alts[9].style.top = Number(lastTop) - 0.5*pluppRadius + "px";
    alts[9].style.left = Number(lastLeft) + 1.8*pluppRadius+  "px";    
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

var points;

var currentPlayer = 1;

function pass() {
    players[currentPlayer-1].pass = true;
    players.splice(currentPlayer-1, 1);

    console.log(currentPlayer);
}

function clicked(pluppNr) {
    console.log(currentPlayer);

    
    if (currentPlayer == 5) {
	currentPlayer = 1;
    }
    if (players[currentPlayer-1] == undefined) {
	currentPlayer++;
	return;
    }
    
    if (players[currentPlayer - 1].pass == false) {

	var clickedPlupp = document.getElementById("plupp" + pluppNr);
	clickedPlupp.style.backgroundColor = "white";
	clickedPlupp.innerHTML = "svar";
	
	if (evaluateAnswer() == true) {
	    players[currentPlayer - 1].addPlupp();
	    currentPlayer++;
	}
	
    } 
}



function evaluateAnswer () {
    return true;
}

// function addPlupp(player) {
//     var container = document.getElementById("p"+player+"Plupp");
//     container.innerHTML += "<div class='usedPlupp'> </div>";
// }





// class Player {

//     constructor(name) {
// 	this.playerNumber = players.length+1;
// 	this.points = 0;
// 	this.plupps = 0;
// 	this.pass = false;
// 	this.scoreBoard = document.getElementById("p" + this.playerNumber + "Points");
// 	// players.push(this);
// 	this.name = name;
	
// 	document.getElementById("player" + this.playerNumber).childNodes[1].innerHTML = this.name;
	
	
//     }

//     addPoints() {
// 	this.points++;
// 	this.scoreBoard.innerHTML = this.points;
//     }
    
//     addPlupp() {
// 	var container = document.getElementById("p"+this.playerNumber+"Plupp");
// 	container.innerHTML += "<div class='usedPlupp'> </div>";
// 	this.plupps++;
//     }
// }

function addPoints(player) {
    this.points++;
    this.scoreBoard.innerHTML = this.points;
}
    
function addPlupp(player) {
    var container = document.getElementById("p"+player+"Plupp");
    container.innerHTML += "<div class='usedPlupp'> </div>";

}


// console.log(players);


