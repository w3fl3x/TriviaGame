$(document).ready(function (){
    //Questions
    var Questions = [{
        //Question 1
        question: "McDonald's sells ___ hamburgers every seconds of each day?",
        answerList: ["60", "75", "90", "110"],
        answer: 1
    }, {
        //Question 2
        question: "How many cans of soda does the average American consume in a year?",
        answerList: ["300", "500", "600", "900"],
        answer: 2
    }, {
        //Question 3
        question: "?",
        answerList: ["a", "b", "c", "d"],
        answer: 3
    }, {
        //Question 4
        question: "?",
        answerList: ["a", "b", "c", "d"],
        answer: 4
    }, {
        //Question 5
        question: "?",
        answerList: ["a", "b", "c", "d"],
        answer: 5
    }, {
        //Question 6
        question: "?",
        answerList: ["a", "b", "c", "d"],
        answer: 6
    }, {
        //Question 7
        question: "What is the oldest soft drink in the United State?",
        answerList: ["Coca-Cola", "Sprite", "Pepsi", "Dr Pepper"],
        answer: 3
    }];

    //Answer tracker
    var correctChoices = 0;
    var wrongChoices = 0;
    var currentQuestion = 0;

    //Hold user answer
    var answered = 0;
    var unAnswered = 0;
    var userSelect = 0;

    //Timer
    var sec = 0;
    var time = 0;

    //Message after each answer with result
    var messages = {
        correct: "Correct!",
        incorrect: "Wrong!",
        endTime: "TIME'S UP!",
        finished: "Game Over"
    };

    //Starting game function
    function startGame() {
        //clear html
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#wrongAnswers').empty();
        $('#unAnswered').empty();
        //clear counter
        currentQuestion = 0;
        correctChoices = 0;
        wrongChoices = 0;
        unAnswered = 0;
        //first question
        newQuestion()
    };

    //Counter
    function countDown() {
        sec = 15;
        $('#timer').html('<p> Time Left: ' + sec + '</p>');
        answered = true;
        time = setInterval(showCountDown, 1000);
    }
});