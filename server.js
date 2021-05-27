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

getNewQeustion();

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
	// const user = userJoin(socket.id,username);
	// socket.join(user.room);
	// socket.id = numOfPlayers;

	// console.log(username);
	
	socket.on('reqCurrentPlayer' , (id) => {
	    if (id == players[currentPlayer-1].id) {
		console.log("match");
		socket.emit('isCurrentPlayer', true)
	    } else {
		console.log("not match");
		socket.emit('isCurrentPlayer', false);
	    }

	});
	

	

	// console.log(currentQuestion);

	// session.push([socket.id, username])

	io.emit('playerName', players);

	//Listen for chatMessage
	socket.on('chatMessage' , (msg) => {
	    io.emit('message', msg);	
	});

	io.emit('question', [currentQuestion.question,currentQuestion.alts]);
	
	// socket.on('addPlupp', function() {

	// });
	
	//runs when client disconnects
	socket.on('disconnect', () =>{
	    io.emit('message', 'a user has left the chat');

	});
    });
        
});

function getNewQeustion() {
    currentQuestion = getQuestion();
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
