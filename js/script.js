// --- Element References ---
const countdownDisplay = document.getElementById('countdown');
const timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');

// --- State Variables ---
let countdownInterval;
let timeLeft;
let isPaused = false;
let totalTime; // To store the initial time for reset

// --- Event Listeners ---
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', togglePause);
resetButton.addEventListener('click', resetTimer);
timeInput.addEventListener('input', syncDisplayWithInput);

// --- Core Functions ---

function startTimer() {
    // Get time from input, ensuring it's a valid number
    const startTime = parseInt(timeInput.value, 10);
    if (isNaN(startTime) || startTime <= 0) {
        alert("Please enter a valid number of seconds.");
        return;
    }

    totalTime = startTime;
    timeLeft = startTime;
    
    updateDisplay(timeLeft);
    
    // Clear any existing timers
    clearInterval(countdownInterval);
    
    // Start the main countdown interval
    countdownInterval = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft <= 0) {
            // Stop the interval when time is up
            clearInterval(countdownInterval);
            
            // Use setTimeout to delay the "Time's up!" message slightly for a better feel
            setTimeout(() => {
                countdownDisplay.textContent = "Time's up!";
                countdownDisplay.style.color = '#4CAF50'; // A nice green for completion
                
                // Re-enable start button and input after the timer finishes
                enableControls(true, false, false);
            }, 200); // A 200ms delay
        }
    }, 1000);

    isPaused = false;
    pauseButton.textContent = 'Pause';
    enableControls(false, true, true); // Disable Start, Enable Pause/Reset
}

function togglePause() {
    if (isPaused) {
        // --- Resume ---
        isPaused = false;
        pauseButton.textContent = 'Pause';
        
        // Restart the interval
        countdownInterval = setInterval(() => {
            timeLeft--;
            updateDisplay(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                countdownDisplay.textContent = "Time's up!";
                enableControls(true, false, false);
            }
        }, 1000);

    } else {
        // --- Pause ---
        isPaused = true;
        pauseButton.textContent = 'Resume';
        clearInterval(countdownInterval);
    }
}

function resetTimer() {
    clearInterval(countdownInterval);
    timeLeft = totalTime || parseInt(timeInput.value, 10);
    updateDisplay(timeLeft);
    
    isPaused = false;
    pauseButton.textContent = 'Pause';
    enableControls(true, false, false); // Enable Start, Disable Pause/Reset
}

// --- Helper Functions ---

function updateDisplay(time) {
    countdownDisplay.textContent = time;
    countdownDisplay.style.color = 'var(--primary-text-color)'; // Reset color on update
}

function syncDisplayWithInput() {
    // When the timer isn't running, update the main display as the user types
    if (startButton.disabled === false) {
        const value = parseInt(timeInput.value, 10);
        if (!isNaN(value) && value > 0) {
            countdownDisplay.textContent = value;
        } else {
            countdownDisplay.textContent = 10; // Default if input is invalid
        }
    }
}

function enableControls(start, pause, reset) {
    startButton.disabled = !start;
    timeInput.disabled = !start;
    pauseButton.disabled = !pause;
    resetButton.disabled = !reset;
}

// Initialize display on page load
syncDisplayWithInput();