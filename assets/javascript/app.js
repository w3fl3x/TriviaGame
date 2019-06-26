$(document).ready(function (){
    //Questions
    var triviaQuestions = [{
        //Question 1
        question: "McDonald's sells how many hamburgers every seconds of each day?",
        answerList: ["60", "75", "90", "110"],
        answer: 1
    }, {
        //Question 2
        question: "How many cans of soda does the average American consume in a year?",
        answerList: ["300", "500", "600", "900"],
        answer: 2
    }, {
        //Question 3
        question: "What condiment was used as a medicine in the 1800's?",
        answerList: ["Ketchup", "Ranch", "Mustard", "Relish"],
        answer: 0
    }, {
        //Question 4
        question: "What breakfast food gets it name from the German word meaning stirrup?",
        answerList: ["Pancake", "Waffle", "Bagel", "Bacon"],
        answer: 2
    }, {
        //Question 5
        question: "What was the first food consumed on the moon in the Apollo 11 moon mission?",
        answerList: ["Ice Cream", "Ham", "Cheese", "Turkey"],
        answer: 3
    }, {
        //Question 6
        question: "An average ear of corn has even number of rows, usually how many rows?",
        answerList: ["20", "16", "12", "8"],
        answer: 1
    }, {
        //Question 7
        question: "What is the oldest soft drink in the United State?",
        answerList: ["Coca-Cola", "Sprite", "Pepsi", "Dr Pepper"],
        answer: 3
    }];

    var imgArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7'];
    var currentQuestion; 
    var correctAnswer; 
    var incorrectAnswer; 
    var unanswered; 
    var seconds; 
    var time; 
    var answered; 
    var userSelect;
    var messages = {
        correct: "Yes, that's correct!",
        incorrect: "No, that's not it.",
        endTime: "Out of time!",
        finished: "Lets see how well you did."
    }

    $('.btn').on('click', function() {
        $(this).hide();
        newGame();
    });

    $('#startOverBtn').on('click', function() {
        $(this).hide();
        newGame();
    });

    function newGame() {
        $('#instruction').empty();
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#incorrectAnswers').empty();
        $('#unanswered').empty();
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        newQuestion();
    };

    function newQuestion() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#image').empty();
        answered = true;

        //sets up new questions and answerList
        $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' +triviaQuestions.length);
        $('.question').html('<p>' + triviaQuestions[currentQuestion].question + '</p>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>');
            choices.text(triviaQuestions[currentQuestion].answerList[i]);
            choices.attr({'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        };
        
        countdown();
        //clicking an answer will pause the time and setup answerPage
        $('.thisChoice').on('click', function() {
            userSelect = $('this').data('index');
            clearInterval(time);
            answerPage();
        });
    };

    function countdown() {
        seconds = 3;
        $('#timeLeft').html('<p>Time Remaining: ' + seconds + '</p>');
        answered = true;
        time = setInterval(showCountdown, 1000);
    };

    function showCountdown() {
        seconds--;
        $('#timeLeft').html('<p>Time Remaining: ' + seconds + '</p>');
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            answerPage();
        };
    };

    function answerPage() {
        $('#currentQuestion').empty();
        $('.thisChoice').empty();
        $('.question').empty();

        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
        $('#image').html('<img src="assets/images/' + imgArray[currentQuestion] + '.jpg" width = "400px">');
        //checks for correct, incorrect or unanswered
        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $('#message').html(messages.correct);
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            incorrectAnswer++;
            $('#message').html(messages.incorrect);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else {
            unanswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }

        if (currentQuestion == (triviaQuestions.length - 1)) {
            setTimeout(scoreboard, 5000);
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 5000);
        };
    };

    function scoreboard() {
        $('#timeLeft').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#image').empty();
        $('#finalMessage').html(messages.finished);
        $('#correctAnswers').html('Correct Answers: ' + correctAnswer);
        $('#incorrectAnswers').html('Incorrect Answers: ' + incorrectAnswer);
        $('#unanswered').html('Unanswered: ' + unanswered);
        $('#startOverBtn').addClass('reset');
        $('#startOverBtn').show();
        $('#startOverBtn').html('Start Over?');
    };
    
});