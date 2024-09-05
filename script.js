//your JS code here. If required.
const app = document.getElementById('app');
const video = document.getElementById('meditation-video');
const sound = document.getElementById('meditation-sound');
const timeDisplay = document.getElementById('time-display');
const playButton = document.querySelector('.play');
let selectedTime = 600; // Default to 10 minutes (600 seconds)
let countdown;
let isPlaying = false;

// Switch between sounds and videos
const soundButtons = document.querySelectorAll('.sound-btn');
soundButtons.forEach(button => {
    button.addEventListener('click', function() {
        const soundType = this.getAttribute('data-sound');
        if (soundType === 'beach') {
            video.src = 'Sounds/beach.mp4';
            sound.src = 'Sounds/beach.mp3';
        } else if (soundType === 'rain') {
            video.src = 'Sounds/rain.mp4';
            sound.src = 'Sounds/rain.mp3';
        }
        resetMeditation();
    });
});

// Time Selection
const timeButtons = document.querySelectorAll('.time-select');
timeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const timeId = this.id;
        if (timeId === 'smaller-mins') {
            selectedTime = 120; // 2 minutes
        } else if (timeId === 'medium-mins') {
            selectedTime = 300; // 5 minutes
        } else if (timeId === 'long-mins') {
            selectedTime = 600; // 10 minutes
        }
        updateTimeDisplay(selectedTime);
    });
});

// Play/Pause functionality
playButton.addEventListener('click', function() {
    if (isPlaying) {
        stopMeditation();
    } else {
        startMeditation();
    }
});

// Update time display
function updateTimeDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timeDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Start meditation session
function startMeditation() {
    sound.play();
    isPlaying = true;
    countdown = setInterval(() => {
        if (selectedTime > 0) {
            selectedTime--;
            updateTimeDisplay(selectedTime);
        } else {
            stopMeditation();
        }
    }, 1000);
}

// Stop meditation session
function stopMeditation() {
    clearInterval(countdown);
    sound.pause();
    isPlaying = false;
}

// Reset video and sound when switching modes
function resetMeditation() {
    sound.pause();
    sound.currentTime = 0;
    video.currentTime = 0;
    selectedTime = 600;
    updateTimeDisplay(selectedTime);
}
