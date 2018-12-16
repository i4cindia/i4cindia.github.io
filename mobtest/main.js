if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}


Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

function setNotifications() {
	document.getElementById("divInfo").innerHTML=localStorage.getItem("NotificationRecord");
}
function clearNotifications() {
	localStorage.setItem("NotificationRecord","");
	setNotifications()
}

function callNotifier() {
	console.log("notifier called");
	message=document.getElementById("txtMessage").value;
	if(message=="") message='Hello world!';
	duration=document.getElementById("txtDuration").value;
	console.log(duration);
	dur=10;
	if(!(isNaN(duration)||duration=="")){dur=duration;}
	console.log(dur);
	setTimeout(function(){ displayNotification(message); },dur*1000);
}

function displayNotification(message) {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      reg.showNotification(message);
    });
  }
  dt=new Date();
  timeNow=dt.getTime();
  localStorage.setItem("NotificationRecord", localStorage.getItem("NotificationRecord")+"<br/>"+"Notification on "+timeNow+" is "+message);
  document.getElementById("divInfo").innerHTML=localStorage.getItem("NotificationRecord");
}

var deferredPrompt;

window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault(); // Prevent Chrome 67 and earlier from automatically showing the prompt
  deferredPrompt = e; // Stash the event so it can be triggered later.
  document.getElementById("btnATHS").style.display="block";
});

function addToHomescreen() {
  document.getElementById("btnATHS").style.display="none";
  deferredPrompt.prompt();  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then(function(choiceResult){

  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the A2HS prompt');
  } else {
    console.log('User dismissed the A2HS prompt');
  }

  deferredPrompt = null;
  }
}
