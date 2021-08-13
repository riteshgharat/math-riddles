var buttonInstall = document.getElementById('install');

// Registering ServiceWorker

if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('./sw.js').then(function(registration) {

    // Registration was successful

    console.log('ServiceWorker registration successful with scope: ', registration.scope);

  }).catch(function(err) {

    // registration failed :(

    console.log('ServiceWorker registration failed: ', err);

  });

}

/*  Sharing Function*/

function share() {

  if (navigator.share) {

    navigator.share({

        title: 'Check it now!',

        url: '${url}',

      }).then(() => {

        //console.log('Thanks for sharing!');

        alert('Thanks for sharing! ^_^');

      })

      .catch(alert.error);

  } else {

    //console.log('Unable to Share!');

    alert('Sorry! Unable to share =_=')

  }

}

/*protecting from reload function*/

window.addEventListener('beforeunload', ev => {

  ev.returnValue = 'Are you sure you want to Exit?';

})

/*score function

function score() {

  /*mainContainer.classList.add('main-con-none');

  levelContainer.classList.add('level-con-none');

  document.querySelector('.score-box').style.display = 'flex';

  document.querySelector('.about-box').style.display = 'none';

  

  alert('');

}
*/

// Initialize deferredPrompt for use later to show browser install prompt.

let deferredPrompt;

const addBtn = document.querySelector('#install');

addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {

  // Prevent Chrome 67 and earlier from automatically showing the prompt

  e.preventDefault();

  // Stash the event so it can be triggered later.

  deferredPrompt = e;

  // Update UI to notify the user they can add to home screen

  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {

    // hide our user interface that shows our A2HS button

    addBtn.style.display = 'none';

    // Show the prompt

    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt

    deferredPrompt.userChoice.then((choiceResult) => {

      if (choiceResult.outcome === 'accepted') {

        console.log('User accepted the A2HS prompt');

      } else {

        console.log('User dismissed the A2HS prompt');

      }

      deferredPrompt = null;

    });

  });

});

