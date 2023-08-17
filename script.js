const carIds = ['a', 'b', 'c', 'd'];

function initializeCar(carId) {
    const carTimes = [];
    let currentCarTimes = [];
    let washTimer, tireCalibrationTimer, interiorCleaningTimer, glassCleaningTimer;

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function updateTimer(timer, startTime, spanId, button) {
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
            timer = setInterval(() => updateTimer(timer, startTime, spanId, button), 100);
            button.textContent = 'Salvar';
            button.classList.add('running');
        }
        return timer;
    }

    function addCarTime(carTimesArray, logContentId) {
        const carTimeInput = document.getElementById(`car_time_${carId}`);
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

    document.getElementById(`add_button_${carId}`).addEventListener('click', () => {
        addCarTime(carTimes, `log_content_${carId}`);
    });

    document.getElementById(`wash_button_${carId}`).addEventListener('click', () => {
        washTimer = startStopTimer(washTimer, `wash_time_${carId}`, document.getElementById(`wash_button_${carId}`));
    });

    document.getElementById(`tire_calibration_button_${carId}`).addEventListener('click', () => {
        tireCalibrationTimer = startStopTimer(tireCalibrationTimer, `tire_calibration_time_${carId}`, document.getElementById(`tire_calibration_button_${carId}`));
    });

    document.getElementById(`interior_cleaning_button_${carId}`).addEventListener('click', () => {
        interiorCleaningTimer = startStopTimer(interiorCleaningTimer, `interior_cleaning_time_${carId}`, document.getElementById(`interior_cleaning_button_${carId}`));
    });

    document.getElementById(`glass_cleaning_button_${carId}`).addEventListener('click', () => {
        glassCleaningTimer = startStopTimer(glassCleaningTimer, `glass_cleaning_time_${carId}`, document.getElementById(`glass_cleaning_button_${carId}`));
    });

    updateTimesDisplay();
}

carIds.forEach(carId => {
    initializeCar(carId);
});

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
const line = "Linha em execução: ";

function iniciarLinha() {
    startTime = Date.now();
    document.getElementById("main").style.display = "block";
    document.getElementById("btnIniciar").style.display = "none";
    document.getElementById("btnDash").style.display = "none";
    document.getElementById("p").style.display = "none";
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

function salvarTempo() {
    localStorage.setItem("tempoTotal", startTime);
    alert("Tempo salvo com sucesso.");
}

function finalizarLinha() {
    clearInterval(interval);
    let resposta = confirm("Deseja realmente encerrar tempo da Linha?");
    if (resposta) {
        document.getElementById("tempo").innerText = "Linha não iniciada: 00:00";
        document.getElementById("main").style.display = "none";
        document.getElementById("btnIniciar").style.display = "block";
        document.getElementById("btnDash").style.display = "block";
        document.getElementById("p").style.display = "block";
    }
}
