let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');
const startSound = document.getElementById('startSound');
const stopSound = document.getElementById('stopSound');
const lapSound = document.getElementById('lapSound');


startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
        startStopBtn.textContent = 'Start';
        stopSound.play();
    } else {
        startTime = Date.now();
        timer = setInterval(updateTime, 10);    
        isRunning = true;
        startStopBtn.textContent = 'Stop';
        startSound.play();
    }
});

resetBtn.addEventListener('click', () => {
    startSound.play();
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00.00'; 
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    lapCounter = 1;
});

function updateTime() {
    const time = elapsedTime + (Date.now() - startTime);
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor(time / 1000 / 60 / 60);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}


function recordLap() {
    const lapTime = elapsedTime + (Date.now() - startTime);
    const lapMilliseconds = Math.floor((lapTime % 1000) / 10);
    const lapSeconds = Math.floor((lapTime / 1000) % 60);
    const lapMinutes = Math.floor((lapTime / 1000 / 60) % 60);
    const lapHours = Math.floor(lapTime / 1000 / 60 / 60);

    const lapItem = document.createElement('div');
    lapItem.classList.add('lap-item');
    lapItem.textContent = `Lap ${lapCounter}: ${pad(lapHours)}:${pad(lapMinutes)}:${pad(lapSeconds)}.${pad(lapMilliseconds)}`;

    const lapsContainer = document.getElementById('laps');
    lapsContainer.appendChild(lapItem);
    lapCounter++;
}

lapBtn.addEventListener('click', () => {
    lapSound.play();

    if (isRunning) {
        recordLap();
    }
});
