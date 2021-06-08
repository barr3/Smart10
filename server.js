const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {userJoin, getCurrentUser} = require('./users');
const {getQuestion} = require('./questions');
const { FORMERR } = require('dns');
const { constants } = require('buffer');
const { url } = require('inspector');
const { Console } = require('console');
// const { DiffieHellman } = require('crypto');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

let players = [];

let currentQuestion;

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

getNewQuestion();

var currentPlayer;

var clickedPlupps = [];

//Run when client connects
io.on('connection', function(socket) {

    socket.on('joinRoom', ({username}) => {

	player = new Player(username, socket.id);
	
	if (players.length >= 4) {
	    socket.emit('tooManyPlayers');
	} else {
	    players.push(player);	
	}	
	currentPlayer = 0; 
	players[0].playersTurn = true;

	socket.on('reqCurrentPlayer' , (id) => {

	    if (id == players[currentPlayer].id && players[currentPlayer].pass == false) {
		socket.emit('isCurrentPlayer', true)
	    } else {
		socket.emit('isCurrentPlayer', false);
	    }
	});

	
	socket.on('submit', ([clickedPlupp, answer, id]) => {
	    if (evaluateQuestion(clickedPlupp, answer)) {
		players[pairPlayerWithPlayer(id)].plupps++;
	    } else {
		players[pairPlayerWithPlayer(id)].plupps = 0;
		players[pairPlayerWithPlayer(id)].pass = true;		
	    }
	    updatePlayers();

	    clickedPlupps.push(clickedPlupp);

	    if (clickedPlupps.length == 10) {
		passOrAllPluppsTaken();
	    } 
	    
	    //Displays the answer and removes plupp

	    io.emit('removePlupp', [clickedPlupp, currentQuestion.answers[clickedPlupp-1]]);

	    nextPlayer();
	    
        });

	socket.on('getClickedPlupp', () => {
	    socket.emit('returnClicked', clickedPlupps);
	});
	// io.emit('playerName', players);
	updatePlayers();
	io.emit('question', [currentQuestion.question,currentQuestion.alts]);

	socket.on('pass', (id) => {
	    passOrAllPluppsTaken(id);
	})
	
	//runs when client disconnects
	socket.on('disconnect', () =>{
	    io.emit('message', 'a user has left the chat');
	});
    });
        
});



function passOrAllPluppsTaken(id){
    if (id != null) {
	var index = pairPlayerWithPlayer(id);
	players[index].pass = true;
	players[index].points += players[index].plupps;
	players[index].plupps = 0;
    }
   
    var numOfPass = 0;
    for (var i = 0; i < players.length; i++) {
	if (players[i].pass == true) {
	    numOfPass++;
	}
    }
    if (numOfPass == players.length || clickedPlupps.length == 10) {
	newRound();
    }
    else {
	console.log("test");
	nextPlayer();		    
	testBool = true;
    }
    updatePlayers();
}


function newRound() {
    console.log("new round");
}

function nextPlayer() {
    //Kind of working
    // console.log("Current player before function:", players[currentPlayer].name, currentPlayer);
    // console.log("currenPlyer:", currentPlayer);
    // console.log("players.length -1 ", players.length-1);
    // if (currentPlayer >= players.length-1) {
    // 	console.log("moise här");
    // 	for (var i = 0; i < players.length-1; i++) {
    // 	    // if (i >= players.length ) {
    // 	    // 	i = 0;
    // 	    // }
    // 	    if (players[i].pass == false) {	
    // 		currentPlayer = i;
    // 		break; // 	    } 	    
    // 	}
    // } else {
    // 	console.log("moise inte här ");
    // 	for (var i = currentPlayer+1; i < players.length; i++) {
    // 	    if (i >= players.length) {
    // 		i = 0;		
    // 		break;
    // 	    }
    // 	    console.log("\ni", i);
    // 	    console.log("players[i].name and pass:", players[i].name, players[i].pass, "\n");
    // 	    if (players[i].pass == false) {
    // 		currentPlayer = i;
    // 		break;
    // 	    } 
    // 	}

    // }
    

    if (currentPlayer+1 >= players.lastIndexOf) {
	for (var i = 0; i < players.length; i++) {
	    if (players[i].pass == false) {
		currentPlayer = i;
		break;
	    }
	}
    } else {
	for (var i = currentPlayer+1; i <= players.length; i++) {
	    if (i == players.length) {
		i = 0;  
	    } 
	    if (players[i].pass == false) {
		currentPlayer = i;
		break;
	    }
	}
    }
    

    

    
    
    

    console.log("Current player: ", players[currentPlayer].name);

    
    
}
// function nextPlayer() {
//     console.log("nextPlayer() called");
    
//     if (currentPlayer >= players.length-1) {
// 	currentPlayer = 0;
//     } else {
// 	currentPlayer++;
//     }
    

//     // while (players[currentPlayer].pass == true) {

//     // 	if (currentPlayer >= players.length-1) {
//     // 	    currentPlayer = 0;	    
//     // 	} else {
//     // 	    currentPlayer++;	    
//     // 	}
	
//     // }

    
//     // if (players[currentPlayer].pass == true) {

//     // 	if (currentPlayer >= players.length-1) {
//     // 	    currentPlayer = 0;
//     // 	} else {
//     // 	    currentPlayer++;	    
//     // 	}
	
//     // }

//     console.log("Current player: ", players[currentPlayer].name);
// }

function updatePlayers() {
    io.emit('playerName', players);
}

function evaluateQuestion(plupp, answer) {
    if (currentQuestion.answers[plupp-1] == answer) {
	return true;
    } else {
	return false;
    }
}

function getNewQuestion() {
    currentQuestion = getQuestion();
}

function pairPlayerWithPlayer(id) {

    for (var i = 0; i < players.length; i++) {
	
	if (players[i].id == id) {
	    return i;
	}
	
    }
}

class Player {

    constructor(name, id) {
	this.playerNumber = players.length+1;
	this.points = 0;
	this.plupps = 0;
	this.pass = false;
	this.playersTurn = false;
	this.id = id;
	// this.scoreBoard = document.getElementById("p" + this.playerNumber + "Points");
	// players.push(this);
	this.name = name;

	
	// document.getElementById("player" + this.playerNumber).childNodes[1].innerHTML = this.name;

    }

    
}


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
