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

window.addEventListener('beforeinstallprompt', function (e) {

	e.userChoice.then(function (choiceResult) {
		var fields = {
			eventCategory: 'ATHS'
		};
		console.log(choiceResult);
		if (choiceResult.outcome === 'dismissed') {
			console.log('User cancelled home screen install');
			fields.eventAction ='ATHS Cancelled';
		}
		else {
			console.log('User added to home screen');
			fields.eventAction ='ATHS Confirmed';
		}
	});
});
