// Selectors
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const workBtn = document.getElementById('workBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');

// Variables
let interval;
let timeLeft;
let isPaused = true;

// Default settings
const settings = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

let currentMode = 'work';
timeLeft = settings[currentMode];

// Functions
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (isPaused) {
        isPaused = false;
        interval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(interval);
                // Add logic here for auto switching or notifying the user
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (!isPaused) {
        isPaused = true;
        clearInterval(interval);
    }
}

function resetTimer() {
    clearInterval(interval);
    isPaused = true;
    timeLeft = settings[currentMode];
    updateTimerDisplay();
}

function switchMode(mode) {
    currentMode = mode;
    resetTimer();
    document.querySelectorAll('.intervals button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`${mode}Btn`).classList.add('active');
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
workBtn.addEventListener('click', () => switchMode('work'));
shortBreakBtn.addEventListener('click', () => switchMode('shortBreak'));
longBreakBtn.addEventListener('click', () => switchMode('longBreak'));

// Initialize display
updateTimerDisplay();
