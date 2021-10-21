var input = document.querySelector('#input');
var btnCheck = document.querySelector('#check');
var subTitle = document.querySelector('.sub-title');
var pointScore = document.querySelector('.score');
var mistakes = document.querySelector('.mistakes');
var gameContainer = document.querySelector('.game-container');
var overlay = document.querySelector('.overlay');
var overlayInner = document.querySelector('.overlay-inner');
var endMessage = document.querySelector('.end-message');
var type = document.querySelector('.type');
var leadScore = document.querySelector('#score');

var StartInterval;
let state = {
  score: 0,
  wrongScore: 0,
  type: 0,
  wrongAns: 0,
  rightAns: 0
}
let minNo;
let maxNo;

var user = {
  playerName: '',
  visited: 0,
  theme: false,
  localhighscore: {
    easy: 0,
    medium: 0,
    hard: 0
  }
}
if (window.localStorage.getItem("MathRiddlesApp") == undefined) {
  window.localStorage.setItem("MathRiddlesApp", JSON.stringify(user));
}
/* to play btn audio */
var btnaudio = new Audio();
/*Main game function*/

/*generating random number*/
function generateNo(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/* generating random problem  */
function generateProblem() {
  return {
    numOne: generateNo(minNo, maxNo),
    numTwo: generateNo(minNo, maxNo),
    operation: ['+', '-', '×', '÷'][generateNo(0, 4)]
  }
}

/*update problem function (main function)*/
function updateProblem() {
  var output = document.querySelector('.sum');
  state.currentProblem = generateProblem()
  output.innerHTML = `${state.currentProblem.numOne}${state.currentProblem.operation}${state.currentProblem.numTwo}`;
  input.value = '';
  answerGen();
}

/*generating answer function*/
var answer;

function answerGen() {
  const p = state.currentProblem;
  if (p.operation == "+") answer = p.numOne + p.numTwo
  if (p.operation == "-") answer = p.numOne - p.numTwo
  if (p.operation == "×") answer = p.numOne * p.numTwo
  if (p.operation == "÷") answer = p.numOne / p.numTwo;

  /*finding weather ans is positive or negative and updaying problem*/
  if (answer <= 5) {
    updateProblem();
    if (parseInt(answer) !== answer) {
      updateProblem();
    }
  }
}

/*check and click function*/
btnCheck.addEventListener('click', () => {
  if (input.value == '') {
    subTitle.textContent = 'Enter Answer!';
  }
  else {
    subTitle.textContent = null;
    if (input.value == answer) {
      state.score += 10;
      state.rightAns++;
      pointScore.innerHTML = state.score + state.wrongScore;
      updateProblem();
    }
    else {
      subTitle.innerHTML = 'Wrong Answer!'
      state.wrongScore -= 5;
      pointScore.innerHTML = state.score + state.wrongScore;
      state.wrongAns++;
      updateProblem();

      if (pointScore.textContent < 0) {
        state.score = 0
        state.wrongScore = 0;
        pointScore.innerHTML = 0;
        updateProblem();
      }
    }
  }
});

var highSc = new Audio();
highSc.src = "music/winner-trumpet.mp3";

function overlaybg() {
  highSc.play();
}
/*(timer)*/
const countdown = document.querySelector('.countdown');

let time;

function timer() {
  time--;
  countdown.innerHTML = `${time}`;
  if (time <= 10) {
    countdown.classList.add('blink');
  } else {
    countdown.classList.remove('blink');
  }
  if (time == 0) {
    clearInterval(StartInterval);
    time *= 0;
    subTitle.innerHTML = 'Time Up';
    overlay.classList.add('overlay-visible');
    gameContainer.classList.add('blurred');
    type.innerHTML = 'Game Over!' + '<br><br>' + `${state.type}` + ' Level';
    var finalScore = `${state.score + state.wrongScore}`;
    endMessage.innerHTML = finalScore;

    var storedData = JSON.parse(localStorage.getItem("MathRiddlesApp"));

    /*Highscore board*/
    if (finalScore > storedData.localhighscore.easy && state.type == 'Easy') {
      user.visited = storedData.visited;
      user.playerName = storedData.playerName;
      user.localhighscore.easy = finalScore;
      user.localhighscore.medium = storedData.localhighscore.medium;
      user.localhighscore.hard = storedData.localhighscore.hard;
      localStorage.setItem('MathRiddlesApp', JSON.stringify(user));
      //console.log(finalScore, state.type + MathRiddlesApp + (finalScore > storedData.easy && state.type == 'Easy'))
      overlayInner.classList.add('overlay-inner-bg');
      highSc.play();
      type.innerHTML = '<b>New High Score</b>' + '<br><br>' + `${state.type}` + ' Level';
    }
    if (finalScore > storedData.localhighscore.medium && state.type == 'Medium') {
      user.visited = storedData.visited;
      user.playerName = storedData.playerName;
      user.localhighscore.medium = finalScore;
      user.localhighscore.easy = storedData.localhighscore.easy;
      user.localhighscore.hard = storedData.localhighscore.hard;
      localStorage.setItem('MathRiddlesApp', JSON.stringify(user));
      //console.log(finalScore, state.type + user + (finalScore > storedData.medium && state.type == 'Medium'))

      overlayInner.classList.add('overlay-inner-bg');
      highSc.play();
      type.innerHTML = '<b>New High Score</b>' + '<br><br>' + `${state.type}` + ' Level';
    }
    if (finalScore > storedData.localhighscore.hard && state.type == 'Hard') {
      user.visited = storedData.visited;
      user.playerName = storedData.playerName;
      user.localhighscore.hard = finalScore;
      user.localhighscore.medium = storedData.localhighscore.medium;
      user.localhighscore.easy = storedData.localhighscore.easy;
      localStorage.setItem('MathRiddlesApp', JSON.stringify(user));
      //console.log(finalScore, state.type + user + (finalScore > storedData.hard && state.type == 'Hard'))
      overlayInner.classList.add('overlay-inner-bg');
      highSc.play();
      type.innerHTML = '<b>New High Score</b>' + '<br><br>' + `${state.type}` + ' Level';
    }
    if ((finalScore <= storedData.localhighscore.easy && state.type == 'Easy') || (finalScore <= storedData.localhighscore.medium && state.type == 'Medium') || (finalScore <= storedData.localhighscore.hard && state.type == 'Hard')) {
      overlayInner.classList.remove('overlay-inner-bg');
      type.innerHTML = 'Game Over!' + '<br><br>' + `${state.type}` + ' Level';
    }
  }
  else {
    subTitle.innerHTML = null;
  }
}
/*restart function*/
function restartGame() {
  state.score = 0;
  state.wrongScore = 0;
  pointScore.innerHTML = 0;
  updateProblem();
  StartInterval = setInterval(timer, 1000);
  time = 61;
  overlay.classList.remove('overlay-visible');
  gameContainer.classList.remove('blurred');

  /*  if (gameContainer.requestFullscreen) {
      gameContainer.requestFullscreen();
    } else if (gameContainer.webkitRequestFullscreen) {
      // Safari 
      gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {
      // IE11 
      elem.msRequestFullscreen();
    }}*/
}