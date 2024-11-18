import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// Your Firebase configuration


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrhC8JF8cme083VmmbO20D-pNfEF-09dQ",
    authDomain: "bluetooth-device-bdac6.firebaseapp.com",
    databaseURL: "https://bluetooth-device-bdac6-default-rtdb.firebaseio.com",
    projectId: "bluetooth-device-bdac6",
    storageBucket: "bluetooth-device-bdac6.firebasestorage.app",
    messagingSenderId: "906405744390",
    appId: "1:906405744390:web:5c37b4a6467a89e6e3d887",
    measurementId: "G-74GV52HWJ1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const lightStatusRef = ref(database, 'light/status');

var toggle = document.querySelector('.toggle');

// Sync local state with Firebase
onValue(lightStatusRef, (snapshot) => {
  const status = snapshot.val();
    if (status === 'on') {
    document.body.classList.add('on');
    audio.play();
  } else {
    document.body.classList.remove('on');
    audio.pause();
  }
});



toggle.addEventListener('click', function() {
  const currentStatus = document.body.classList.contains('on') ? 'off' : 'on';

  
  // Update Firebase database
  set(lightStatusRef, currentStatus);
  

});
