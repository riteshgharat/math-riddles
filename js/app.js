/*protecting from reload function*/
window.addEventListener('beforeunload', ev => {
  ev.returnValue = 'Are you sure you want to Exit?';
})

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
}

function level() {
  mainContainer.classList.remove('main-con-none');
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
/*confirm box*/
function no() {
  //clearInterval(StartInterval, false);
  //setInterval(timer, 1000);
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

/* score function*/
var storedData = JSON.parse(localStorage.getItem('localhighscore'));

function score() {
  mainContainer.classList.add('main-con-none');
  levelContainer.classList.add('level-con-none');
  document.querySelector('.score-con').style.display = 'flex';

  storedData = JSON.parse(localStorage.getItem('localhighscore'));
  document.querySelector("#scoreBoard").innerHTML = 'Easy: ' + storedData.easy + '<br><br>' + 'Medium: ' + storedData.medium + '<br><br>' + 'Hard: ' + storedData.hard;
}
/*function to clear player score*/
function clearLS() {
  var conFirm = confirm('Are you sure want to clear your score?');
  if (conFirm == true) {
    window.localStorage.clear("localhighscore");
    alert('Data Clear Successfully!, just refresh app once ^_^');
    window.location.reload();
  }
}

function cancel() {
  mainContainer.classList.remove('main-con-none');
  levelContainer.classList.remove('level-con-none');
  document.querySelector('.score-con').style.display = 'none';
}

/*  Sharing Function*/
function share() {
  if (navigator.share) {
    navigator.share({
        title: 'Math Riddles Vs.1.5',
        text: 'Challenge yourself with Complicated Maths Puzzle Game and Interesting Riddles Maths Riddles level up your IQ with a mix of Math Oparation. Challenge yourself with different levels of maths games and stretch the limits of your mind. Brain games are prepared with an approach of an IQ test. Enjoy & Share game with your friends. Check it now!',
        url: 'https://mathriddles.netlify.app'
      }).then(() => {
        alert('Thanks for sharing! ^_^');
      })
      .catch(alert.error);
  } else {
    alert('Sorry! Unable to share =_=')
  }
}

/*Registering ServiceWorker*/

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    console.log('Successfully registered service worker', reg);
  }).catch(function(err) {
    console.warn('Error whilst registering service worker', err);
  });
}
var butInstall = document.querySelector('#install');

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  divInstall.classList.toggle('hidden', false);
});
butInstall.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  const result = await promptEvent.userChoice;
  console.log('👍', 'userChoice', result);
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button.
  divInstall.classList.toggle('hidden', true);
});
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});
 
