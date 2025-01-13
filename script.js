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
const taskInput = document.getElementById('task-input');
const addTimeButton = document.getElementById('add-time');
const taskDisplay = document.getElementById('task-display');

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
        taskInput.disabled = true;
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
    taskInput.disabled = false;
    taskInput.value = '';
    taskDisplay.textContent = '';
    startButton.style.display = 'none';
}

function addFiveMinutes() {
    timeLeft += 5 * 60;
    updateTimer();
}

function checkTaskInput(event) {
    // Only proceed if Enter key is pressed
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        startButton.style.display = 'inline-block';
        taskDisplay.textContent = taskInput.value;
        taskInput.disabled = true;
        event.preventDefault(); // Prevent form submission if within a form
    } else if (event.key === 'Enter' && taskInput.value.trim() === '') {
        event.preventDefault(); // Prevent empty submissions
    }
}

// Initialize
setWorkMode();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
workModeButton.addEventListener('click', setWorkMode);
taskInput.addEventListener('keypress', checkTaskInput);
addTimeButton.addEventListener('click', addFiveMinutes);