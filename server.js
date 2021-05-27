const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {userJoin, getCurrentUser} = require('./users');
const {getQuestion} = require('./questions');
const { FORMERR } = require('dns');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

let players = [];

let currentQuestion;

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

getNewQuestion();

var currentPlayer = 1;

//Run when client connects
io.on('connection', function(socket) {

    socket.on('joinRoom', ({username}) => {

	player = new Player(username, socket.id);
	
	if (players.length >= 4) {
	    socket.emit('tooManyPlayers');
	} else {
	    players.push(player);	
	}
	
	players[0].playersTurn = true;

	socket.on('reqCurrentPlayer' , (id) => {
	    if (id == players[currentPlayer-1].id) {
		console.log("match");
		socket.emit('isCurrentPlayer', true)
	    } else {
		console.log("not match");
		socket.emit('isCurrentPlayer', false);
	    }
	});

	
	socket.on('submit', ([clickedPlupp, answer, id]) => {
	    if (evaluateQuestion(clickedPlupp, answer)) {
		players[pairPlayerWithPlayer(id)].plupps++;
	    } else {
		players[pairPlayerWithPlayer(id)].plupps = 0;
	    }
	    updatePlayers();
	    
	    //Displays the answer and removes plupp

	    io.emit('removePlupp', [clickedPlupp, currentQuestion.answers[clickedPlupp-1]]);
	    
        });

	// io.emit('playerName', players);
	updatePlayers();
	io.emit('question', [currentQuestion.question,currentQuestion.alts]);
	
	//runs when client disconnects
	socket.on('disconnect', () =>{
	    io.emit('message', 'a user has left the chat');

	});
    });
        
});

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
