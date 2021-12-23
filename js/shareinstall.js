/*  Sharing Function*/
function share() {
  if (navigator.share) {
    navigator.share({
        title: 'Math Riddles',
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
var storedData = JSON.parse(localStorage.getItem("MathRiddlesApp"));

function shareUrl() {
  //var myUrl = new URL("https://mathriddles.netlify.app/images/assets/score.html")
  var myUrl = new URL(location.href)
  myUrl.searchParams.set("medium", storedData.localhighscore.medium);
  //myUrl.searchParams.set("no", Math.random().toFixed(10))
  myUrl.searchParams.set("hard", storedData.localhighscore.hard);
  myUrl.searchParams.set("playerName", storedData.playerName);
  myUrl.searchParams.set("easy", storedData.localhighscore.easy);

  // console.log(encodeURIComponent(myUrl.search))
  //console.log(myUrl)
  myUrl = myUrl.origin + '/images/assets/score.html' + encodeURIComponent(myUrl.search)
  //console.log(myUrl)

  if (navigator.share) {
    navigator.share({
      title: 'Math Riddles',
      text: storedData.playerName + ' Challenge you to beat his score in Math Riddles. Accept Challenge 💪🏻😎 & beat it!',
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
    console.log('👍 Successfully registered service worker', /*reg*/ );
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
                window.location.reload();
              }
              else {
                window.location.reload();
              }
              break;
            }
        }
      });
    });
  })
};

var butInstall = document.querySelector('#install');

window.addEventListener('beforeinstallprompt', (event) => {
  //console.log('👍', 'beforeinstallprompt', event);

  storedData = JSON.parse(localStorage.getItem('MathRiddlesApp'));
  const data = navigator.userAgent;
  const replaceBrand = data.replace('SM', 'Samsung')
  let deviceBrand = replaceBrand.match('Samsung');
  deviceBrand = deviceBrand[0];

  if (storedData.visited == 0 && deviceBrand == 'Samsung') {
    alert('Download Same App from Samsung App Store')
    window.location.href = 'https://apps.samsung.com/appquery/appDetail.as?appId=app.netlify.mathriddles.twa';
  }
  else {
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    //divInstall.classList.toggle('hidden', false);
  }
});

butInstall.addEventListener('click', () => {
  //console.log('👍', 'butInstall-clicked');

  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  const result = promptEvent.userChoice;
  //console.log('👍', 'userChoice', result);
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button.
  //divInstall.classList.toggle('hidden', true);
  //}
});

window.addEventListener('appinstalled', (event) => {
  //console.log('👍', 'appinstalled', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});

if (navigator.getInstallRelatedApps) {
  //navigator.getInstallRelatedApps();
  const relatedApps = navigator.getInstalledRelatedApps();
  relatedApps.forEach(app => {
    console.log(app.id, app.platform, app.url);
  });
}
else {
  console.log('related app api is not present in browser!')
}