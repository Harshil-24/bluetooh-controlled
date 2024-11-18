var toggle = document.querySelector('.toggle');
const audio = new Audio('1040.wav'); // Replace with your audio file path
audio.loop = true;
let isPlaying = false;

toggle.addEventListener('click', function() {
    document.body.classList.toggle('on');
    console.log("on/off");
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
});
