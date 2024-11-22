import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, onValue, set, get} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// Your Firebase configuration



var toggle = document.querySelector('.toggle');
const audio = new Audio('1040.wav'); // Replace with your audio file path
audio.loop = true;
let isPlaying = false;

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

const urlParams = new URLSearchParams(window.location.search);
const authcode = urlParams.get('authcode');
const button = document.getElementById("toggle");

  
console.log(authcode);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const lightStatusRef = ref(database, 'light/status');
var devices_array = []
const devices = ref(database, 'devices');

function addRandomStringToDevices(strings) {
  const devicesRef = devices;

  get(devicesRef)
      .then((snapshot) => {
          if (snapshot.exists()) {
              const devices = snapshot.val() || [];
              const randomString = Math.random().toString(36).substring(2, 10); // Generate random string
              devices.push(randomString);

              set(devicesRef, devices)
                  .then(() => {
                      console.log("Random string added to devices:", randomString);
                  })
                  .catch((error) => {
                      console.error("Error updating devices:", error);
                  });
          } else {
              console.error("Devices data not found.");
          }
      })
      .catch((error) => {
          console.error("Error fetching devices data:", error);
      });
}

function generateQRCode() {
  console.log("QR Code generation started");

  // Generate a random 6-character string
  const randomString = Math.random().toString(36).substring(2, 8);
  console.log("Generated random string:", randomString);
  addRandomStringToDevices(randomString);

 
  // Clear previous QR code if any
  const qrCodeContainer = document.getElementById('qrCodeContainer');
  qrCodeContainer.innerHTML = ''; // Clear previous QR code

  // Generate the QR code using the QRCode library
  QRCode.toCanvas(document.createElement('canvas'), randomString, function (error, canvas) {
      if (error) {
          console.error("Error generating QR code:", error);
      } else {
          console.log("QR code generated successfully");
          qrCodeContainer.appendChild(canvas); // Append the generated QR code to the container
      }
  });
}

window.generateQRCode = generateQRCode;


onValue(devices, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  if (data.includes(authcode)) {
    console.log('String exists in the array');
  } else {
    console.log('String does not exist in the array');
    button.disabled = true;
    // Call the function
    displayError('Please Get Authorised');

  }
  
});






var toggle = document.querySelector('.toggle');

// Sync local state with Firebase
onValue(lightStatusRef, (snapshot) => {
  const status = snapshot.val();
  if (status === 'on') {
    document.body.classList.add('on');
  } else {
    document.body.classList.remove('on');
  }
});



toggle.addEventListener('click', function() {
  const currentStatus = document.body.classList.contains('on') ? 'off' : 'on';
  console.log("on/off");
  if (isPlaying) {
      audio.pause();
  } else {
      audio.play();
  }
  isPlaying = !isPlaying;
  
  // Update Firebase database
  set(lightStatusRef, currentStatus);
  

});



function displayError(message) {
  // Create the error container
  const errorDiv = document.createElement('div');
  errorDiv.textContent = message;
  
  // Apply styles to match your theme
  Object.assign(errorDiv.style, {
      position: 'fixed',
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '1rem 2rem',
      background: '#2a3f47', // Matches your dark theme background
      color: '#fff', // White text for visibility
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      fontSize: '1.2rem',
      textAlign: 'center',
      zIndex: '1000',
  });
  
  // Append the error to the body
  document.body.appendChild(errorDiv);

  // Remove the error after 3 seconds
  setTimeout(() => {
      errorDiv.remove();
  }, 3000);
}

