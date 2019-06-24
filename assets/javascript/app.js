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
        newQuestion();
    };

    //Counter
    function countDown() {
        sec = 15;
        $('#timer').html('<p>Time Left: ' + sec + '</p>');
        answered = true;
        time = setInterval(showCountDown, 1000);
    };

    function showCountDown() {
        sec--;
        $('#timer').html('<p>Time Left: ' + sec + '</p>');
        if (sec < 1) {
            clearInterval(time);
            answered = false;
            answerPage();
        };
    };

    //New Question function
    function newQuestion() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        answer = true;

        //set up new question
        $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + Questions.length);
        $('#question').html('<p>' + Questions[currentQuestion].question + '</p>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<div');
            choices.text(Questions[currentQuestion].answerList[i]);
            choices.attr({'data-index': i});
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        };
        countDown();

        //Clicking an answer will pause time and show answer page
        $('.thisChoice').on('click', function() {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage();
        });
    };

    //Answer page
    function answerPage() {
        //clear question page
        $('#currentQuestion').empty();
        $('.thischoice').empty();
        $('#question').empty();

        //hold answer
        var rightAnswerText = Questions[currentQuestion].answerList[Questions[currentQuestion].answer];
        //correct answer array
        var rightAnswerIndex = Questions[currentQuestion].answer;

        //check for correct, wrong or unanswered
        //if choose correct answer
        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            //win increase by 1
            correctChoices++;
            //correct message displays on screen
            $('#message').html(messages.correct);
            //if wrong answer 
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            //wrong answer goes up by 1
            wrongChoices++;
            //correct answer display
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else {
            unAnswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The Correct answer was: ' + rightAnswerText);
            answered = true;
        };
        //once last question is completed display score
        if (currentQuestion == (Questions.length - 1)) {
            setTimeout(scoreBoard, 1000)
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 2000);
        };
    };

    //end game score
    function scoreBoard() {
        //clear time and correctedAnswer
        $('#timer').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
        //display message
        $('#finalMessage').html(messages.finished);
        //final results
        $('#correctAnswers').html('Correct Answers: ' + correctChoices);
        $('#wrongAnswers').html('Wrong Answers' + wrongChoices);
        $('#unAnswered').html('Unanswered: ' + unAnswered);
        //reset game
        $('#startAgainBtn').addClass('reset');
        $('#startAgainBtn').show();
        $('#startAgainBtn').html('Restart?');
    };

    //process
    $('.startbutton').on('click', function() {
        $(this).hide();
        startGame();
    });
    //reset button
    $('#startAgainBtn').on('click', function() {
        $(this).hide();
        startGame();
    });
});