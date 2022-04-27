//protecting from reload function
window.addEventListener('pageshow', ev => {
  if (location.hash != '#home') { location.hash = '#home'; }
})

var user = {
  playerName: '',
  visited: 0,
  theme: false,
  localhighscore: {
    easy: 0,
    medium: 0,
    hard: 0
  },
  installed: false
}

function getContent(fragmentId, callback) {
  var pages = {
    home: `<div class="main-container">
        <nav class="main-nav">
          <a href="#about" class="btn info">i</a>
          <img onclick="share()" class="btn share svg" src="./images/assets/share-alt.svg" alt="share" />
        </nav>
        <!--Main Container-->
        <audio src="music/bg.mp3" loop></audio>
        <div class="title">
          <h2>Math</h2>
          <p>Riddiles</p><br />
          <img src="./images/assets/chrome--qrcode.png" id="qrcode" />
          <!--span>Vs1.0</span-->
        </div>
        <div class="main-page-btn">
          <!--button class="btn main-btn" onclick="Play()">Play</button-->
          <a href="#level" class="btn main-btn">Play</a>
          <!--button class="btn main-btn" onclick="music()">Music</button-->
          <a href="#score" class="btn main-btn">Score</a>
          <button class="btn main-btn install" id="install">Install</button>
        </div>
      </div>`,
    about: `
       <div class="about-con">
        <a type="submit" href="#home" class="btn cancel" >x</a>
    <div class="title">
      <img src="/images/logo144.png" alt="logo144" />
      <h2>Math</h2>
      <p>Riddiles</p><br />
      <span>Vs1.5.0.0</span>
    </div><br>
    <a href="https://apps.samsung.com/appquery/appDetail.as?appId=app.netlify.mathriddles.twa" target="_blank"><img src="/images/assets/GalaxyStore_English.png" alt="Math Riddles - Simple Math Quiz App | Samsung Store" style="width: 250px; height: 54px;" width="250" height="54" ></a><br>
    <a href="https://www.producthunt.com/posts/math-riddles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-math-riddles" target="_blank"><img src="/images/assets/review.svg" alt="Math Riddles - Simple Math Quiz App | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a><br><br>
      <div class="about-info">
      <h3>#About: </h3><br />
      <p>Simple Quiz App with Interesting Maths Riddles & Levels up your IQ with Math Oparations.</p><br />
      <h3>#Keyfeature:</h3><br />
      <ul>
        <li>Interesting Maths Riddles</li>
        <li>Easy to learn Math</li>
        <li>Compete With Friends & Share Score with Friends</li>
        <li>Live Score Update</li>
        <li>Offline Support</li>
      </ul><br />
      <h3>#Credit:</h3><br>
      <ul><li>Hosting: Netlify </li><li>Icons: Font Awesome, Icons8</li></ul><br>
      <!--img src="/images/banner.jpg" alt="banner"/><br /-->
      <h3>#Contribute</h3><br />
      <p>The entire project source is available on GitHub. Feel free to use it for whatever *personal* reasons you need, but please don't redistrubute or try to sell it. If you have suggestions for feature you'd like to see added, or if you find any bugs, send me an email at:<a href="mailto:riteshgharat05@gmail.com" target="_blank">riteshgharat05@gmail.com</a> <a target="_blank" href="https://twitter.com/__iamrit__"><i class="fab fa-twitter"></i> Twitter</a><a target="_blank" href="https://github.com/imritpro/Math-Riddles-" class="github"><i class="fab fa-github"></i> Github</a>
    </div>
  </div>`,
    score: `<div class="score-con">
          <div class="score-box">
            <div class="score-nav">
              <h2>Score Board</h2>
              <a type="submit" href="#home" class="btn cancel" >x</a>
            </div>
            <hr>
           <input class="playerName" maxlength="20" max="20" placeholder="Player's name✏" > 
           <hr>
            <p id="scoreBoard"></p>
            <hr/>
            <p><b>Rules:</b><br><br>Right Answer: <span class="green">+10</span> <br><br>Wrong Answer: <span class="red">-5</span></p>
            <button type="submit" class="btn clear" onclick="clearLS()">Clear Score</button>
            <button type="submit" class="btn shareUrl" onclick="shareUrl()">Share With Friends</button>
            <br>
          </div>
        </div>`,
    level: `<!--level container-->
      <div class="level-container">
        <nav class="level-nav">
          <a href="#home" class="btn main-btn">Level</a>
        </nav>
        <div class="level-con-btn">
            <button onclick="easy()" class="btn level-btn">Easy</button>
            <button onclick="medium()" class="btn level-btn">Medium</button>
            <button onclick="hard()" class="btn level-btn">Hard</button>
        </div>
      </div>`
  };
  callback(pages[fragmentId]);
}

function loadContent() {
  var contentDiv = document.querySelector("#app"),
    fragmentId = location.hash.substr(1);
  getContent(fragmentId, function(content) {
    contentDiv.innerHTML = content;
  });
}
if (!location.hash) {
  location.hash = "#home";
}
loadContent();

window.onhashchange = function() {
  storedData = JSON.parse(localStorage.getItem('MathRiddlesApp'));

  if (location.hash == "#home") {
    user.visited = storedData.visited;
    user.visited++;
    user.playerName = storedData.playerName;
    user.installed = storedData.installed;
    user.localhighscore.easy = storedData.localhighscore.easy;
    user.localhighscore.medium = storedData.localhighscore.medium;
    user.localhighscore.hard = storedData.localhighscore.hard;
    window.localStorage.setItem("MathRiddlesApp", JSON.stringify(user));

    const data = navigator.userAgent;
    const replaceBrand = data.replace('SM', 'Samsung')
    let = deviceBrand = replaceBrand.match('Samsung');
    deviceBrand = deviceBrand[0];

    if (storedData.visited == 0 && deviceBrand == 'Samsung') {
      window.location.href = 'https://apps.samsung.com/appquery/appDetail.as?appId=app.netlify.mathriddles.twa';
    }
  }

  if (location.hash == "#score") {
    function score() {
      document.querySelector("#scoreBoard").innerHTML = 'Easy: ' + storedData.localhighscore.easy + '<br><br>' + 'Medium: ' + storedData.localhighscore.medium + '<br><br>' + 'Hard: ' + storedData.localhighscore.hard;

      const pName = document.querySelector('.playerName');
      pName.addEventListener('change', () => {
        user.playerName = pName.value;
        user.visited = storedData.visited;
        user.installed = storedData.installed;
        user.localhighscore.easy = storedData.localhighscore.easy;
        user.localhighscore.medium = storedData.localhighscore.medium;
        user.localhighscore.hard = storedData.localhighscore.hard;
        window.localStorage.setItem("MathRiddlesApp", JSON.stringify(user));
      })
      pName.value = storedData.playerName;
      if (pName.value != "") {
        document.querySelector('.shareUrl').style.display = 'block'
      }
    }
    setTimeout(score, 10)
    window.onload = function() { if (location.hash == '#score') { setTimeout(score, 10) } }
  }
}
window.addEventListener("hashchange", loadContent);

/* score function*/
var storedData = JSON.parse(localStorage.getItem('MathRiddlesApp'));
/*function to clear player score*/
function clearLS() {
  var conFirm = confirm('Are you sure want to clear your score?');
  if (conFirm == true) {
    window.localStorage.clear("MathRiddlesApp");
    alert('Data Clear Successfully!, just refresh app once ^_^');
    window.location.reload();
    window.location.hash = '#home';
  }
}

//on buttton press play music function
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
document.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    btnaudio.src = 'music/buttonpress.mp3';
    btnaudio.play();
  })
});

/* displaying level container*/
var levelContainer = document.querySelector('#app')

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
  gameContainer.classList.add('blurred');;

  /*if (!gameContainer.requestFullscreen) {
    gameContainer.exitFullscreen();
  }*/
}
/*confirm box*/
function no() {
  clearInterval(StartInterval);
  confirmBox.classList.remove('confirm-box-display');
  gameContainer.classList.remove('blurred');

  StartInterval = setInterval(timer, 1000);
}

function yes() {
  confirmBox.classList.remove('confirm-box-display');
  gameContainer.classList.remove('blurred');
  levelContainer.classList.remove('level-con-none');
  clearInterval(StartInterval);
  time = 61;
  location.hash = '#level';
}


function Home() {
  yes();
  overlay.classList.remove('overlay-visible');
  gameContainer.classList.remove('blurred');

  location.hash = '#home';
  console.log(location.hash);
}

function handleVisibilityChange() {
  let visibility = document.visibilityState;
  if (location.hash == '#game' && visibility == 'hidden') {
    back();
  }
}
document.addEventListener("visibilitychange", handleVisibilityChange, false);

/*js for popup*/
function popUpApply(type, title) {
  let pop = document.querySelector('.popUp');
  let src;

  if (type == 'error') {
    src = '/images/assets/circle-exclamation-solid.svg';
    pop.style.backgroundColor = '#FF6464';
    pop.innerHTML = `<img id="popImg" src="${src}"><br>${title}`;
  }
  else if (type == 'success') {
    src = '/images/assets/circle-check-solid.svg';
    pop.style.backgroundColor = '#6DFF64';
    pop.innerHTML = `<img id="popImg" src="${src}"><br>${title}`;
  }
  else if (type == 'alert') {
    src = '/images/assets/triangle-exclamation-solid.svg';
    pop.style.backgroundColor = '#FFF664';
    pop.innerHTML = `<img id="popImg" src="${src}"><br>${title}`;
  }
  else { pop.innerText = 'undefined type or title'; }
  pop.classList.remove('PopUpApply');
  void pop.offsetWidth; // trigger a DOM reflow suggest by https://betterprogramming.pub/how-to-restart-a-css-animation-with-javascript-and-what-is-the-dom-reflow-a86e8b6df00f
  pop.classList.toggle('PopUpApply');
}

window.addEventListener('keydown', (e) => {
  var keyIn = document.querySelector('#input').value;

  //console.log(e.key, e.keyCode, e.char)

  if (e.keyCode == 27) { back() }
  if (e.keyCode == 13) { check() }
  if (e.keyCode == 8) { keyIn = '' }

  if (e.keyCode == 96) { keyIn += "0" }
  else if (e.keyCode == 97) { keyIn += "1" }
  else if (e.keyCode == 98) { keyIn += "2" }
  else if (e.keyCode == 99) { keyIn += "3" }
  else if (e.keyCode == 100) { keyIn += "4" }
  else if (e.keyCode == 101) { keyIn += "5" }
  else if (e.keyCode == 102) { keyIn += "6" }
  else if (e.keyCode == 103) { keyIn += "7" }
  else if (e.keyCode == 104) { keyIn += "8" }
  else if (e.keyCode == 105) { keyIn += "9" }
  else { keyIn = '' }
})
