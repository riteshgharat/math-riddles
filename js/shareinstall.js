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
var storedData = JSON.parse(localStorage.getItem('localhighscore'));

function shareUrl() {
  const myUrl = new URL("http://localhost:7700/images/assets/score.html")
  myUrl.searchParams.set("medium", storedData.localhighscore.medium);
  myUrl.searchParams.set("no", Math.random().toFixed(10))
  myUrl.searchParams.set("hard", storedData.localhighscore.hard);
  myUrl.searchParams.set("playerName", storedData.playerName);
  myUrl.searchParams.set("easy", storedData.localhighscore.easy);

  //console.log(myUrl)

  if (navigator.share) {
    navigator.share({
      title: 'Math Riddles Vs.1.5',
      text: 'Friends Score',
      url: myUrl
    }).then(() => {
      alert('Thanks for sharing! ^_^');
    })
  }
  else {
    alert('Sorry! Unable to share =_=')
  }
}
/*Registering ServiceWorker*/

if ('serviceWorker' in navigator) {
  // Register the service worker
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('Successfully registered service worker', reg);
    reg.addEventListener('updatefound', () => {
      // An updated service worker has appeared in reg.installing!
      newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        // Has service worker state changed?
        switch (newWorker.state) {
          case 'installed':
            // There is a new service worker available, show the notification
            if (navigator.serviceWorker.controller) {
              //let notification = document.getElementById('notification ');
              //notification.className = 'show';
              const update = confirm('New update available!')
              if (update == true) {
                //console.log('updated')
                window.location.reload();
                refreshing = true;
              }
              break;
            }
        }
      });
    });
  })
};
/*
let refreshing;
// The event listener that is fired when the service worker updates
// Here we reload the page
navigator.serviceWorker.addEventListener('controllerchange', function() {
  if (refreshing) return;
  window.location.reload();
  refreshing = true;
});
*/

// make the whole serviceworker process into a promise so later on we can
// listen to it and in case new content is available a toast will be shown
window.isUpdateAvailable = new Promise(function(resolve, reject) {
  // lazy way of disabling service workers while developing
  if ('serviceWorker' in navigator) {
    // register service worker file
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('Successfully registered service worker', reg);
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  // new update available
                  resolve(true);
                } else {
                  // no update available
                  resolve(false);
                }
                break;
            }
          };
        };
      })
      .catch(err => console.error('[SW ERROR]', err));
  }
});

// Update:
// this also can be incorporated right into e.g. your run() function in angular,
// to avoid using the global namespace for such a thing.
// because the registering of a service worker doesn't need to be executed on the first load of the page.
// listen to the service worker promise in index.html to see if there has been a new update.
// condition: the service-worker.js needs to have some kind of change - e.g. increment CACHE_VERSION.
window['isUpdateAvailable']
  .then(isAvailable => {
    if (isAvailable) {
      alert('updae available! ')
      const toast = this.toastCtrl.create({
        message: 'New Update available! Reload the webapp to see the latest juicy changes.',
        position: 'bottom',
        showCloseButton: true,
      });
      toast.present();
    }
  });


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
