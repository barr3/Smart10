class Question {
    constructor(question,alts, answers) {
	this.question = question;
	this.alts = alts;
	this.answers = answers;
    }
}

let testQuestion = new Question(
    "Vad är en korv?",
    ["Fråga 1", "Fråga 2", "Fråga 3", "Fråga 4", "Fråga 5", "Fråga 6", "Fråga 7", "Fråga 8", "Fråga 9", "Fråga 10"],
    ["Svar 1", "Svar 2", "Svar 3", "Svar 4", "Svar 5", "Svar 6", "Svar 7", "Svar 8", "Svar 9", "Svar 10"]    
)

function getQuestion() {
    return testQuestion;
}


module.exports = {
    getQuestion
}
