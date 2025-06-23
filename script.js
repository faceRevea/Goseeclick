//localStorage.clear();
let score;
let energy = localStorage.getItem("energy")
	? Number(localStorage.getItem("energy"))
	: 500;
let fullEnergy = localStorage.getItem("fullEnergy")
	? Number(localStorage.getItem("fullEnergy"))
	: 500;
let percentEnergy;
let countClick = 10; // для текста изменить силу клик
let LvLEnergy = localStorage.getItem("LvLEnergy")
	? Number(localStorage.getItem("LvLEnergy"))
	: 0;
let priceLvLEnergy = localStorage.getItem("priceLvLEnergy")
	? Number(localStorage.getItem("priceLvLEnergy"))
	: 100;
let LvLRestart = localStorage.getItem("LvLRestart")
	? Number(localStorage.getItem("LvLRestart"))
	: 0;

let energyHTML = document.getElementById("energyText");
let scoreHTML = document.getElementById("Score");
let countEnergyHTML = document.getElementById("countEnergy");
let fillEnergyHTML = document.getElementById("energyFill");
let priceLvLEnergyHTML = document.getElementById("priceLvLEnergy");
let lvlEnergyHTML = document.getElementById("lvlEnergy");
let LvLRestartHTml = document.getElementById("lvLRestart");

if (localStorage.getItem("score")) {
	score = Number(localStorage.getItem("score"));
} else {
	score = 0;
}
function dataScreen() {
	//ФУНКЦИЯ ОТРИСОВКИ ВСЕХ ДАННЫХ В ЛС играть
	scoreHTML.innerText = score;
	energyHTML.innerText = energy;
	percentEnergy = (energy / fullEnergy) * 100;
	fillEnergyHTML.style.width = percentEnergy + "%";
}

function dataScreen2() {
	dataScreen(); //доход
	lvlEnergyHTML.innerText = LvLEnergy;
	priceLvLEnergyHTML.innerText = priceLvLEnergy;
	LvLRestartHTml.innerText = LvLRestart;
}
// проверка стартовой страницы
const path = window.location.pathname;
if (path.includes("index.html")) {
	dataScreen();
} else if (path.includes("magazin.html")) {
	dataScreen2();
}

const obj = document.getElementById("objectClick");
if (obj) {
	obj.addEventListener("touchstart", clicker);
}

const obj2 = document.getElementById("payLvLEnergy");
if (obj2) {
	obj2.addEventListener("touchstart", payLvLEnergy);
}
const obj3 = document.getElementById("payLvLRestart");
if (obj3) {
	obj3.addEventListener("touchstart", payLvLRestart);
}

function saveData() {
	//ФУНКЦИЯ СОХРАНЕНИЯ ВСЕХ ДАННЫХ В ЛС
	localStorage.setItem("fullEnergy", fullEnergy);
	localStorage.setItem("energy", energy);
	localStorage.setItem("LvLEnergy", LvLEnergy);
	localStorage.setItem("priceLvLEnergy", priceLvLEnergy);
	localStorage.setItem("score", score);
	localStorage.setItem("LvLRestart", LvLRestart);
}

function clicker(event) {
	//ФУНКЦИЯ КЛИКА ПО ПЕРСОНАЖУ
	if (energy >= countClick) {
		score += countClick;
		scoreHTML.innerText = score;

		energy--;
		energy -= countClick;
		energyHTML.innerText = energy;
	}
	percentEnergy = (energy / fullEnergy) * 100;
	fillEnergyHTML.style.width = percentEnergy + "%";
	saveData();
}
// функция пополнения энергии
function regenerateEnergy() {
	if (energy < fullEnergy) {
		energy++;
		energyHTML.innerText = energy;
	}
	percentEnergy = (energy / fullEnergy) * 100;
	fillEnergyHTML.style.width = percentEnergy + "%";
	saveData();
}

setInterval(regenerateEnergy, 1000);
function payLvLEnergy() {}
if (score >= priceLvLEnergy) {
	score -= priceLvLEnergy;
	LvLEnergy++;
	priceLvLEnergy *= 3.25;
	fullEnergy += 100;
	scoreHTML.innerText = score;
	priceLvLEnergyHTML.innerText = priceLvLEnergy;
	lvlEnergyHTML.innerText = LvLEnergy;
	countEnergyHTML.innerText = 100;
	saveData();
}
function payLvLRestart() {
	if (LvLRestart < 6) {
		LvLRestart++;
		energy = fullEnergy;
		saveData();
		dataScreen2();
	}
}

setInterval(regenerateEnergy, 1000);
