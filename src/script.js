const input = document.querySelector(".input")
const inputHour = document.querySelector(".input_hour")
const inputMin = document.querySelector(".input_min")
const inputSec = document.querySelector(".input_sec")
const btnStart = document.querySelector(".btn_start")
const display = document.querySelector(".display_timer")
const progress = document.querySelector("progress")
const controls = document.querySelector(".controls")
const btnPause = document.querySelector(".btn_pause_resume")
const btnClear = document.querySelector(".btn_clear")

let timerId;
let remainSeconds;
let hour, min, sec = 0;

const getInputTime = () => {
	const hour = Number(inputHour.value);
	const min = Number(inputMin.value);
	const sec = Number(inputSec.value);
	return hour * 3600 + min * 60 + sec;
}

const getDisplayTime = () => {
	return hour * 3600 + min * 60 + sec;
}

const alramOn = () => {
	const myAudio = new Audio();
	myAudio.src = "./src/alram.wav";
	myAudio.play();
}

const runCountdown = (remainSeconds) => {
	const startTime = Date.now()
	timerId = setInterval(() => {
		let diff = remainSeconds - Math.floor((Date.now() - startTime) / 1000);
		hour = Math.floor(diff / 3600);
		min = Math.floor(diff / 60 % 60);
		sec = Math.floor(diff % 60);
		display.innerHTML = `${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
		progress.value = (diff / getInputTime()) * 100;
		diff--;
		if (diff < 0) {
			clearTimer();
			alramOn();
		}
	}, 1000)
}

const startTimer = () => {
	remainSeconds = getInputTime();
	if (remainSeconds == 0) {
		alert("please enter time");
	} else {
		runCountdown(remainSeconds);
		hour = Math.floor(remainSeconds / 3600);
		min = Math.floor(remainSeconds / 60 % 60);
		sec = Math.floor(remainSeconds % 60);
		display.innerHTML = `${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
		btnStart.disabled = true;
		inputHour.disabled = true;
		inputMin.disabled = true;
		inputSec.disabled = true;
		progress.value = 100;
		controls.classList.add("view");
	}
}

const clearTimer = () => {
	clearInterval(timerId);
	inputHour.value = "";
	inputMin.value = "";
	inputSec.value = "";
	btnStart.disabled = false;
	inputHour.disabled = false;
	inputMin.disabled = false;
	inputSec.disabled = false;
	display.innerHTML = "00:00:00";
	btnPause.innerHTML = "PAUSE";
	progress.value = 0;
	controls.classList.remove("view");
}

const pauseTimer = () => {
	if (btnPause.innerHTML === "PAUSE") {
		clearInterval(timerId);
		btnPause.innerHTML = "RESUME";
	} else {
		remainSeconds = getDisplayTime();
		runCountdown(remainSeconds);
		btnPause.innerHTML = "PAUSE";
	}
}

const inputCheck = (e) => {
	if(e.target == inputHour && e.target.value > 23) {
		e.target.value = 23;
	}
	if(e.target.value > 59) {
		e.target.value = 59;
	}
	if(e.target.value.length >= e.target.maxLength) {
		e.target.nextElementSibling.focus();
	}
}

const init = () => {
	btnStart.addEventListener("click", startTimer);
	btnClear.addEventListener("click", clearTimer);
	btnPause.addEventListener("click", pauseTimer);
	input.addEventListener("keyup", inputCheck);
	document.addEventListener("keydown", (e) => {
		if (e.keyCode == 32 && !(display.innerHTML === "00:00:00")) {
			pauseTimer();
		}
	})
}

init();