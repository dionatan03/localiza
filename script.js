const carTimes = [];
let currentCarTimes = [];
let washTimerA, tireCalibrationTimerA, interiorCleaningTimerA, glassCleaningTimerA;
let washTimerB, tireCalibrationTimerB, interiorCleaningTimerB, glassCleaningTimerB;
let washTimerC, tireCalibrationTimerC, interiorCleaningTimerC, glassCleaningTimerC;
let washTimerD, tireCalibrationTimerD, interiorCleaningTimerD, glassCleaningTimerD;

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimesDisplay() {
    const carTimesList = document.getElementById('car_times_list');
    if (carTimesList) {
        carTimesList.innerHTML = '';

        carTimes.forEach((times, index) => {
            const li = document.createElement('li');
            li.textContent = `Linha ${index + 1}: ${times.map(time => formatTime(time)).join(', ')}`;
            carTimesList.appendChild(li);
        });
    }
}

function updateTimer(timer, startTime, spanId) {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    const span = document.getElementById(spanId);
    span.textContent = formatTime(currentTime);
    if (currentTime >= 60) {
        clearInterval(timer);
        timer = null;
        button.textContent = 'Iniciar';
        button.classList.remove('running');
    }
}

function startStopTimer(timer, spanId, button) {
    if (timer) {
        clearInterval(timer);
        timer = null;
        button.textContent = 'Iniciar';
        button.classList.remove('running');
    } else {
        const startTime = Date.now() - (parseFloat(document.getElementById(spanId).textContent) || 0) * 1000;
        timer = setInterval(() => updateTimer(timer, startTime, spanId), 100);
        button.textContent = 'Parar';
        button.classList.add('running');
    }
    return timer;
}

function addToLog(logMessage, logContentId) {
    const logContent = document.getElementById(logContentId);
    const logItem = document.createElement('div');
    logItem.textContent = logMessage;
    logContent.appendChild(logItem);
    logContent.scrollTop = logContent.scrollHeight;
}

function addCarTime(carTimesArray, logContentId) {
    const carTimeInput = document.getElementById('car_time');
    const carTime = parseFloat(carTimeInput.value);
    if (!isNaN(carTime)) {
        currentCarTimes.push(carTime);
        carTimeInput.value = '';
        addToLog(`Tempo registrado: ${formatTime(carTime)}`, logContentId);
    }

    if (currentCarTimes.length === 4) {
        carTimesArray.push([...currentCarTimes]);
        currentCarTimes = [];
        updateTimesDisplay();
    }
}

// Carro A
document.getElementById('add_button_a').addEventListener('click', () => {
    addCarTime(carTimes, 'log_content_a');
});

document.getElementById('wash_button_a').addEventListener('click', () => {
    washTimerA = startStopTimer(washTimerA, 'wash_time_a', document.getElementById('wash_button_a'));
});

document.getElementById('tire_calibration_button_a').addEventListener('click', () => {
    tireCalibrationTimerA = startStopTimer(tireCalibrationTimerA, 'tire_calibration_time_a', document.getElementById('tire_calibration_button_a'));
});

document.getElementById('interior_cleaning_button_a').addEventListener('click', () => {
    interiorCleaningTimerA = startStopTimer(interiorCleaningTimerA, 'interior_cleaning_time_a', document.getElementById('interior_cleaning_button_a'));
});

document.getElementById('glass_cleaning_button_a').addEventListener('click', () => {
    glassCleaningTimerA = startStopTimer(glassCleaningTimerA, 'glass_cleaning_time_a', document.getElementById('glass_cleaning_button_a'));
});

// Carro B
document.getElementById('add_button_b').addEventListener('click', () => {
    addCarTime(carTimes, 'log_content_b');
});

document.getElementById('wash_button_b').addEventListener('click', () => {
    washTimerB = startStopTimer(washTimerB, 'wash_time_b', document.getElementById('wash_button_b'));
});

document.getElementById('tire_calibration_button_b').addEventListener('click', () => {
    tireCalibrationTimerB = startStopTimer(tireCalibrationTimerB, 'tire_calibration_time_b', document.getElementById('tire_calibration_button_b'));
});

document.getElementById('interior_cleaning_button_b').addEventListener('click', () => {
    interiorCleaningTimerB = startStopTimer(interiorCleaningTimerB, 'interior_cleaning_time_b', document.getElementById('interior_cleaning_button_b'));
});

document.getElementById('glass_cleaning_button_b').addEventListener('click', () => {
    glassCleaningTimerB = startStopTimer(glassCleaningTimerB, 'glass_cleaning_time_b', document.getElementById('glass_cleaning_button_b'));
});

// Carro C
document.getElementById('add_button_c').addEventListener('click', () => {
    addCarTime(carTimes, 'log_content_c');
});

document.getElementById('wash_button_c').addEventListener('click', () => {
    washTimerC = startStopTimer(washTimerC, 'wash_time_c', document.getElementById('wash_button_c'));
});

document.getElementById('tire_calibration_button_c').addEventListener('click', () => {
    tireCalibrationTimerC = startStopTimer(tireCalibrationTimerC, 'tire_calibration_time_c', document.getElementById('tire_calibration_button_c'));
});

document.getElementById('interior_cleaning_button_c').addEventListener('click', () => {
    interiorCleaningTimerC = startStopTimer(interiorCleaningTimerC, 'interior_cleaning_time_c', document.getElementById('interior_cleaning_button_c'));
});

document.getElementById('glass_cleaning_button_c').addEventListener('click', () => {
    glassCleaningTimerC = startStopTimer(glassCleaningTimerC, 'glass_cleaning_time_c', document.getElementById('glass_cleaning_button_c'));
});

// Carro D
document.getElementById('add_button_d').addEventListener('click', () => {
    addCarTime(carTimes, 'log_content_d');
});

document.getElementById('wash_button_d').addEventListener('click', () => {
    washTimerD = startStopTimer(washTimerD, 'wash_time_d', document.getElementById('wash_button_d'));
});

document.getElementById('tire_calibration_button_d').addEventListener('click', () => {
    tireCalibrationTimerD = startStopTimer(tireCalibrationTimerD, 'tire_calibration_time_d', document.getElementById('tire_calibration_button_d'));
});

document.getElementById('interior_cleaning_button_d').addEventListener('click', () => {
    interiorCleaningTimerD = startStopTimer(interiorCleaningTimerD, 'interior_cleaning_time_d', document.getElementById('interior_cleaning_button_d'));
});

document.getElementById('glass_cleaning_button_d').addEventListener('click', () => {
    glassCleaningTimerD = startStopTimer(glassCleaningTimerD, 'glass_cleaning_time_d', document.getElementById('glass_cleaning_button_d'));
});

updateTimesDisplay();

//carrossel

function changeTab(index) {
    const carouselSlides = document.getElementsByClassName("carousel-slide");
    const tabPanes = document.getElementsByClassName("tab-pane");
    for (var i = 0; i < carouselSlides.length; i++) {
        carouselSlides[i].style.display = "none";
        tabPanes[i].classList.remove("active");
    }
    carouselSlides[index].style.display = "block";
    tabPanes[index].classList.add("active");
}

changeTab(0);

//oculta e mostra main.
let startTime;
let interval;
const line = "Linha aberta: ";

function iniciarLinha() {
    startTime = Date.now();
    document.getElementById("main").style.display = "block";
    document.getElementById("btnIniciar").style.display = "none";
    interval = setInterval(atualizarTempo, 1000);
}

function atualizarTempo() {
    let currentTime = Date.now();
    let timeElapsed = currentTime - startTime;
    let formattedTime = formatTime(timeElapsed);
    document.getElementById("tempo").innerText = line + formattedTime;
}

function formatTime(time) {
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return formattedMinutes + ":" + formattedSeconds;
}

function finalizarLinha() {
    let resposta = confirm("Deseja realmente encerrar tempo da Linha?");
    if (resposta) {
        clearInterval(interval);
        localStorage.setItem("tempoTotal", startTime);
        alert("Linha encerrada. O tempo foi salvo.");
        document.getElementById("tempo").innerText = "00:00";
        document.getElementById("main").style.display = "none";
        document.getElementById("btnIniciar").style.display = "block";
    }
}

