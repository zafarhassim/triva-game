// Questions and answers Array
var questions = [
  {
    question: 'What does doctype in HTML do?',
    answers: [
      { answer: 'A. Tells the browser how to render the HTML markup', value: true },
      { answer: 'B. Loads all references to external JavaScript files', value: false },
      { answer: 'C. Adds CSS styles to the HTML page', value: false },
      { answer: "D. It doesn't do anything it's just there as a comment to other developers", value: false }
    ]
  },
  {
    question: 'What is NOT an HTML5 element?',
    answers: [
      { answer: 'block', value: true },
      { answer: 'audio', value: false },
      { answer: 'canvas', value: false },
      { answer: 'section', value: false }
    ]
  },
  {
    question: 'How can you make a script run asynchronous?',
    answers: [
      { answer: 'script async', value: true },
      { answer: 'asynchronous', value: false },
      { answer: 'async script', value: false },
      { answer: 'script asynchronous', value: false }
    ]
  },
  {
    question: 'What is the difference between classes and IDs in CSS?',
    answers: [
      { answer: 'IDs can only be used once in the HTML', value: true },
      { answer: 'IDs can be accessed by JavaScript', value: false },
      { answer: 'Classes are used on children elements', value: false },
      { answer: "Classes can't be added to the body element", value: false }
    ]
  },
  {
    question: "What does 'reset' in CSS mean?",
    answers: [
      { answer: 'Resets the default browser styling', value: true },
      { answer: 'Normalizes styles accross all browsers', value: false },
      { answer: 'Removes inline CSS styles', value: false },
      { answer: 'Start the project over', value: false }
    ]
  },
  {
    question: 'What does z-index do?',
    answers: [
      { answer: 'Controls the vertical stacking order of elements that overlap', value: true },
      { answer: 'Moves elements off screen', value: false },
      { answer: 'Hides elements from the screen', value: false },
      { answer: 'Controls the horizontal stacking order of elements that overlap', value: false }
    ]
  },
  {
    question: 'What is the box model?',
    answers: [
      { answer: 'All HTML elements can be considered as boxes', value: true },
      { answer: 'A way of stacking HTML elements', value: false },
      { answer: 'A way of styling HTML elements', value: false },
      { answer: 'Creates a way to position the browser grid', value: false }
    ]
  }
];

// Global variables
var game;
var counter = 0;
var clock;
var timer = 30;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

$(document).ready(function() {
  // Start the game when that start button is clicked
  $('.answers').css('visibility', 'hidden');
  $('body').on('click', '.start-btn', function(event) {
    event.preventDefault();
    startGame();
    $('.answers').css('visibility', 'visible');
  });

  $('body').on('click', '.answer', function(event) {
    // console.log($(this));
    chosenAnswer = $(this).text();
    var answerCounter = questions[counter].answers;

    var answer = $('.answer');
    for (var i = 0; i < answerCounter.length; i++) {
      if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
        clearInterval(clock);
        var right = $(this).attr('class', 'right-answer answer');
        rightAnswer();
      } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
        clearInterval(clock);
        $(this).attr('class', 'wrong-answer answer');
        $('.first-answer').css('background-color', 'green');
        $('.first-answer').css('color', 'white');
        wrongAnswer();
      }
    }
  });

  $('body').on('click', '.reset-button', function(event) {
    event.preventDefault();
    resetGame();
  });
});

function rightAnswer() {
  correctCounter++;
  $('.time').html(timer);
  $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
  setTimeout(questionCounter, 2000);
}

function wrongAnswer() {
  incorrectCounter++;
  $('.time').html(timer);
  $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
  setTimeout(questionCounter, 2000);
}

function unanswered() {
  unanswered++;
  $('.main').append("<p class='times-up'>Time's up!</p>");
  $('.right-answer').css('background-color', 'green');
  $('.times-up')
    .delay(2000)
    .fadeOut(400);
  setTimeout(questionCounter, 2000);
}

// Start the game
function startGame() {
  $('.start-page').css('display', 'none');
  $('.questions-page').css('visibility', 'visible');
  $('.timer').html('<p>Time remaining: <span class="time">30</span></p>');

  $('.question').html(questions[counter].question);
  var showingAnswers =
    '<p class="answer first-answer">' +
    questions[counter].answers[0].answer +
    '</p><p class="answer">' +
    questions[counter].answers[1].answer +
    '</p><p class="answer">' +
    questions[counter].answers[2].answer +
    '</p><p class="answer">' +
    questions[counter].answers[3].answer +
    '</p>';

  $('.answers').html(showingAnswers);

  timerHolder();
}

function questionCounter() {
  if (counter < 6) {
    counter++;
    startGame();
    timer = 30;
    timerHolder();
  } else {
    finishGame();
  }
}

// Timer function
function timerHolder() {
  clearInterval(clock);
  clock = setInterval(seconds, 1000);
  function seconds() {
    if (timer === 0) {
      clearInterval(clock);
      unanswered();
    } else if (timer > 0) {
      timer--;
    }
    $('.time').html(timer);
  }
}

// Finishing the game
function finishGame() {
  var final = $('.main')
    .html("<p>All done, here's how you did!<p><br><br>")
    .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
    .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
  $(final).attr('<div>');
  $(final).attr('class', 'final');
  $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
}

// Reset the game
function resetGame() {
  counter = 0;
  correctCounter = 0;
  incorrectCounter = 0;
  unansweredCounter = 0;
  timer = 30;
  startGame();
  timerHolder();
}
