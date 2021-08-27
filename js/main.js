
 /*  Sharing Function*/
 function share() {
   if (navigator.share) {
     navigator.share({
         title:'Math Riddles Vs.1.0',
         text: 'Math Riddles Vs.1.0. Challenge yourself with Complicated Maths Puzzle Game and Interesting Riddles Maths Riddles level up your IQ with a mix of Math Oparation. Challenge yourself with different levels of maths games and stretch the limits of your mind. Brain games are prepared with an approach of an IQ test. Enjoy & Share game with your friends. Check it now!',
         url: 'https://mathriddles.netlify.app'
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
/*
 var msg;
 window.addEventListener('beforeinstallprompt', (e) => {
   e.preventDefault();
   msg = e;
  buttonInstall.style.display = 'block'
 });

 function install() {
   msg.prompt();
  buttonInstall.style.display = 'none';
 }*/
