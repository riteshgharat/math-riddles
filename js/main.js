 var buttonInstall = document.querySelector('#install');

 /*  Sharing Function*/
 function share() {
   if (navigator.share) {
     navigator.share({
      title:'Math Riddles',
         text: 'Math Riddles Vs1.2. Check it now!',
         url: 'http://mathriddles.netlify.app'
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
