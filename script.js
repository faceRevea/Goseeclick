//localStorage.clear();
let score;
let energy = localStorage.getItem("energy")
	? Number(localStorage.getItem("energy"))
	: 500;
let fullEnergy = localStorage.getItem("fullEnergy")
	? Number(localStorage.getItem("fullEnergy"))
	: 500;
let percentEnergy;
let countClick = 1; // для текста изменить силу клик
let LvLEnergy = localStorage.getItem("LvLEnergy")
	? Number(localStorage.getItem("LvLEnergy"))
	: 0;
let priceLvLEnergy = localStorage.getItem("priceLvLEnergy")
	? Number(localStorage.getItem("priceLvLEnergy"))
	: 100;
let scoreInHour = localStorage.getItem("scoreInHour")
	? Number(localStorage.getItem("scoreInHour"))
	: 0;

//при заходе на страницу востанавливаем карточки  из ls
let energyHTML = document.getElementById("energyText");
let scoreHTML = document.getElementById("Score");
let countEnergyHTML = document.getElementById("countEnergy");
let fillEnergyHTML = document.getElementById("energyFill");
let priceLvLEnergyHTML = document.getElementById("priceLvLEnergy");
let lvlEnergyHTML = document.getElementById("lvlEnergy");
let LvLRestartHTml = document.getElementById("lvLRestart");
let scoreInHourHTML = document.getElementById("InHour");
let cardDate = {
	1: {
		price: 100,
		img: "photo_5395342058039930306_jpg.jpg",
		bonus: 100,
		title: "Гусиный буст",
		level: 0,
		k: 2.3,
	},
	2: {
		price: 250,
		img: "photo_5395342058039930304_jpg.jpg",
		bonus: 300,
		title: "гусиный менеджер",
		level: 0,
		k: 2.3,
	},
	3: {
		price: 400,
		img: "photo_5395342058039930303_gpg.jpg",
		bonus: 100,
		title: "гусиный бизнес",
		level: 0,
		k: 2.3,
	},
	4: {
		price: 150,
		img: "photo_5395342058039930305_jpg.jpg",
		bonus: 100,
		title: "гусинные добавки",
		level: 0,
		k: 2.3,
	},
};

Object.keys(cardDate).forEach(id => {
	const saved = JSON.parse(localStorage.getItem(`card${id}`));
	if (saved) {
		cardDate[id] = saved;
	}
});

if (localStorage.getItem("score")) {
	score = Number(localStorage.getItem("score"));
} else {
	score = 0;
}
function dataScreen() {
	//ФУНКЦИЯ ОТРИСОВКИ ВСЕХ ДАННЫХ В ЛС играть
	scoreHTML.innerText = Math.floor(score);
	energyHTML.innerText = energy;
	percentEnergy = (energy / fullEnergy) * 100;
	fillEnergyHTML.style.width = percentEnergy + "%";
	scoreInHourHTML.innerText = scoreInHour;
}
//проверка на дату сброса восстановления энергии
let LvLRestartDate = localStorage.getItem("LvLRestartDate");
let today = new Date().toDateString();
let LvLRestart;
if (LvLRestartDate !== today) {
	LvLRestart = 0;
} else {
	LvLRestart = localStorage.getItem("LvLRestart")
		? Number(localStorage.getItem("LvLRestart"))
		: 0;
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
	console.log("aaaa");
	dataScreen();
} else if (path.includes("magazin.html")) {
	console.log("dsgsdgf");
	dataScreen2();
}
const containersCardPassive = document.querySelectorAll(".cardPassive");
containersCardPassive.forEach(container => {
	const id = container.getAttribute("data-id");
	const data = cardDate[id];
	if (data) {
		container.innerHTML = `<div class="imgCard card2" style="background-image: url(image/${data.img}); background-size:cover; 	background-position: 0 20px;">
								<p> 
									ур. <span id="lvl${id}">${data.level}</span> 
								</p>
							</div> 
							<p class="text2">${data.title}</p>`;
	}
});
const dialog = document.getElementById("screenLvLPassive");

containersCardPassive.forEach(container => {
	let touchStart = 0;
	let touchEnd = 0;
	container.addEventListener("touchstart", e => {
		touchStart = e.changedTouches[0].screenX;
	});
	container.addEventListener("touchend", e => {
		touchEnd = e.changedTouches[0].screenX;

		if (Math.abs(touchStart - touchEnd) < 10) {
			const id = container.getAttribute("data-id");
			const data = cardDate[id];

			if (data) {
				dialog.innerHTML = `<form method="dialog">
				<button class="closeButton">❌</button>
				<img src="image/${data.img}" alt="" class="picture">
				<h2>${data.title}</h2>
				<div class="textContainer">
					<p>ур. <s$ class="LvLPassive"></s${data.level}</span></p>
					<p><span class="bonusPassive">${data.bonus}</span>  в час</p>
				</div>
				<BUTTON CLASS ="	payLvLCardPassive">
					<p>Купить за <span class="priceLvLCardPassive">${data.price}</span></p>
				</BUTTON>
				</div>
			</form>`;
				dialog.showModal();
				dialog
					.querySelector(".payLvLCardPassive")
					.addEventListener("touchstart", e => {
						payLvLCardPassive(id, data);
					});
			}
		}
	});
});

function payLvLCardPassive(id, data) {
	if (score >= data.price) {
		score -= data.price;
		scoreHTML.innerText = Math.floor(score);
		data.level++;
		data.price = Math.floor(data.price * data.k);
		scoreInHour += data.bonus;
		scoreInHourHTML.innerText = scoreInHour;
		data.bonus = Math.floor(data.bonus * data.k);
		document.querySelector(`#lvl${id}`).innerText = data.level;

		localStorage.setItem(`card${id}`, JSON.stringify(data));
		localStorage.setItem("scoreInHour", scoreInHour);
	}
}

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
	localStorage.setItem("LvLRestartDate", new Date().toDateString());
}

function clicker(event) {
	//ФУНКЦИЯ КЛИКА ПО ПЕРСОНАЖУ
	if (energy >= countClick) {
		score += countClick;
		scoreHTML.innerText = Math.floor(score);

		energy--;
		energy -= countClick;
		energyHTML.innerText = energy;
		const img = event.currentTarget.querySelector("#imgClick");
		img.style.transform = "scale(0.9)";
		setTimeout(() => (img.style.transform = ""), 200);

		const plus = document.createElement("div");
		plus.innerHTML = `+${countClick}`;
		plus.className = "plusOne";

		const panel = event.currentTarget;
		const rect = panel.getBoundingClientRect();
		plus.style.left = `${event.clientX - rect.left}px`;
		plus.style.top = `${event.clientY - top.left}px`;

		panel.appendChild(plus);
		setTimeout(() => plus.remove(), 3000);
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
}
score += scoreInHour / 3600;
scoreHTML.innerText = Math.floor(score);
saveData();

setInterval(regenerateEnergy, 1000);
function payLvLEnergy() {}
if (score >= priceLvLEnergy) {
	score -= priceLvLEnergy;
	LvLEnergy++;
	priceLvLEnergy *= 3.25;
	fullEnergy += 100;
	scoreHTML.innerText = Math.floor(score);
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
//вызов при закрытии
window.addEventListener("beforeunLoad", () => {
	localStorage.setItem(`lastVisit`, Date.now());
});
//вызов при загрузке игры
window.addEventListener("load", () => {
	const lastVisit = localStorage.getItem("`lastVisit`");
	const now = Date.now();
	if (now - lastVisit < 60000 && lastVisit) {
		let hoursAway = (now - perseInt(lastVisit)) / (60 * 60 * 1000);
		if (hoursAway) {
			hoursAway = 3;
		}

		//начисление монет
		let offlineScore = Math.floor(scoreInHour * hoursAway);
		score += offlineScore;
		scoreHTML.innerText = Math.floor(score);
		alert(`вы заработали ${offlineScore}`);
		//начисление энергии
		let offlineEnergy = Math.floor(hoursAway * 3600);
		energy = Math.min(energy + offlineEnergy, fullEnergy);
		energyHTML.innerText = energy;
		fillEnergyHTML.style.width = percentEnergy + "%";
		scoreInHourHTML.innerText = scoreInHour;
	}
});
