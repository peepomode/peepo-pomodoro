let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const workModeButton = document.getElementById('work-mode');
const restModeButton = document.getElementById('rest-mode');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function setWorkMode() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = 25 * 60;
    statusText.textContent = 'Work Time';
    workModeButton.classList.add('mode-active');
    restModeButton.classList.remove('mode-active');
    updateTimer();
}

function setRestMode() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = false;
    timeLeft = 5 * 60;
    statusText.textContent = 'Break Time';
    restModeButton.classList.add('mode-active');
    workModeButton.classList.remove('mode-active');
    updateTimer();
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateTimer();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                if (isWorkTime) {
                    setRestMode();
                } else {
                    setWorkMode();
                }
                alert(isWorkTime ? 'Work Time!' : 'Break Time!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    if (isWorkTime) {
        setWorkMode();
    } else {
        setRestMode();
    }
}

// Initialize
setWorkMode();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
workModeButton.addEventListener('click', setWorkMode);
restModeButton.addEventListener('click', setRestMode); 