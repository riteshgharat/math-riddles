var input = document.querySelector('#input');
var output = document.querySelector('.sum');
var btnCheck = document.querySelector('#check');
var subTitle = document.querySelector('.sub-title');
var pointScore = document.querySelector('.score');
var mistakes = document.querySelector('.mistakes');
var gameContainer = document.querySelector('.game-container');
var overlay = document.querySelector('.overlay');
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


/* to play btn audio */
var btnaudio = new Audio();
//var clockaudio = new Audio();
var bgmusic = new Audio();
/*
window.onload = function() {
  bgmusic.src = 'music/bg.mp3';
  bgmusic.play();
};
function music() {
  bgmusic.pause();
}
*/

//buttton music function
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    btnaudio.src = 'music/buttonpress.mp3';
    btnaudio.play();
  })
});
document.querySelectorAll('span').forEach(span => {
  span.addEventListener('click', () => {
    btnaudio.src = 'music/buttonpress.mp3';
    btnaudio.play();
  })
});

/*displaying main container*/
var mainContainer = document.querySelector('.main-container')

function Play() {
  mainContainer.classList.add('main-con-none');
  /*document.querySelector('.about-app').classList.add('about-app-display');*/
}

function level() {
  mainContainer.classList.remove('main-con-none');
  /* document.querySelector('.about-app').classList.add('about-app-display');*/
}

/* displaying level container*/
var levelContainer = document.querySelector('.level-container')

function easy() {
  minNo = 1;
  maxNo = 10;
  state.type = 'Easy';
  updateProblem()
  levelContainer.classList.add('level-con-none');
  restartGame();
}

function medium() {
  minNo = 10;
  maxNo = 20;
  state.type = 'Medium';
  updateProblem()
  levelContainer.classList.add('level-con-none');
  restartGame();
}

function hard() {
  minNo = 20;
  maxNo = 50;
  state.type = 'Hard';
  updateProblem()
  levelContainer.classList.add('level-con-none');
  restartGame()
}

/* back btn function */
var confirmBox = document.querySelector('.confirm-box-layer');

function back() {
  //var exitConfirm = confirm('Are sure you want to exit?');
  clearInterval(StartInterval);
  confirmBox.classList.add('confirm-box-display');
  gameContainer.classList.add('blurred');
}
//confirm box
function no() {
  //clearInterval(StartInterval)false;
  setInterval(timer, 1000);
  confirmBox.classList.remove('confirm-box-display');
  gameContainer.classList.remove('blurred');
}

function yes() {
  confirmBox.classList.remove('confirm-box-display');
  gameContainer.classList.remove('blurred');

  levelContainer.classList.remove('level-con-none');
  clearInterval(StartInterval);
  time = 61;
}

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
  if (answer < 0) {
    updateProblem();
    //console.log('answer is negative')
    //console.log(answer);
  }
  if (parseInt(answer) !== answer) {
    updateProblem();
    //console.log('answer is interger')
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
        //subTitle.innerHTML = 'Wrong Answer!'
        state.score = 0
        state.wrongScore = 0;
        pointScore.innerHTML = 0;
        updateProblem();
      }
    }
  }
});

/*(timer)*/
const countdown = document.querySelector('.countdown');

let time;

function timer() {
  time--;
  countdown.innerHTML = `${time}`;
  /*clockaudio.src = 'music/clockMusic.mp3';
  clockaudio.play();*/
  if (time <= 10) {
    countdown.classList.add('blink');
  } else {
    countdown.classList.remove('blink');
    /* clockaudio.src = 'music/clockMusic.mp3';
     clockaudio.pause();*/
  }
  if (time == 0) {
    clearInterval(StartInterval);
    time *= 0;
    subTitle.innerHTML = 'Time Up';

    //playing audio

    overlay.classList.add('overlay-visible');
    gameContainer.classList.add('blurred');
    type.innerHTML = 'Game Over!' + '<br><br>' + `${state.type}` + ' Level';
    endMessage.innerHTML = `${state.score + state.wrongScore}`;
    // leadScore.innerHTML = `${state.type}: ${state.score + state.wrongScore}`;

    // +'Right Ans: ' +`${state.rightAns}` + '<br>' +
    // 'Wrong Ans: ' +`${state.wrongAns}` + '<br>';
  }
  else {
    subTitle.innerHTML = null;
  }
}

/*restart function*/
function restartGame() {
  state.score = 0
  state.wrongScore = 0;
  pointScore.innerHTML = 0;
  updateProblem();
  StartInterval = setInterval(timer, 1000);
  time = 61;
  overlay.classList.remove('overlay-visible');
  gameContainer.classList.remove('blurred');
}
