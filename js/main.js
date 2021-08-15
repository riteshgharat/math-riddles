 var buttonInstall = document.getElementById('install');

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


 if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/sw.js').then(function(reg) {
     console.log('Successfully registered service worker', reg);
   }).catch(function(err) {
     console.warn('Error whilst registering service worker', err);
   });
 }

 let installPromptEvent;

 window.addEventListener('beforeinstallprompt', (event) => {
   // Prevent Chrome <= 67 from automatically showing the prompt
   event.preventDefault();
   // Stash the event so it can be triggered later.
   installPromptEvent = event;
   // Update the install UI to notify the user app can be installed
   document.querySelector('#install-button').disabled = false;
 });
 /*
 btnInstall.addEventListener('click', () => {
   // Update the install UI to remove the install button
   document.querySelector('#install-button').disabled = true;
   // Show the modal add to home screen dialog
   installPromptEvent.prompt();
   // Wait for the user to respond to the prompt
   installPromptEvent.userChoice.then((choice) => {
     if (choice.outcome === 'accepted') {
       console.log('User accepted the A2HS prompt');
     } else {
       console.log('User dismissed the A2HS prompt');
     }
     // Clear the saved prompt since it can't be used again
     installPromptEvent = null;
   });
 });
 */
 var msg;
 window.addEventListener('beforeinstallprompt', (e) => {
   e.preventDefault();
   msg = e;
 });

 function install() {
   msg.prompt();
   console.log("hello world")
 }
