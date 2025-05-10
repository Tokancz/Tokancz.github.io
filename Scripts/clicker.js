let meows = getCookie("meow") || 0;
let muted = false;

const meowSounds = [
    new Audio('/Audio/Meow.mp3'),
    new Audio('/Audio/Meow2.mp3'),
    new Audio('/Audio/Meow3.mp3'),
    new Audio('/Audio/Meow4.mp3'),
    new Audio('/Audio/Meow5.mp3'),
    new Audio('/Audio/Meow6.mp3'),
    new Audio('/Audio/Meow7.mp3')
];

setInterval(AFKCalc, 1000);

const kitty = document.getElementById("kitty");
const mutebtn1 = document.getElementById("loud");
const mutebtn2 = document.getElementById("muted");

kitty.addEventListener('click', Meow);
mutebtn1.addEventListener('click', mute);
mutebtn2.addEventListener('click', mute);

document.querySelectorAll(".upgrades section").forEach(section => {
    section.addEventListener("click", () => {
        const id = section.querySelector("span").id;
        if (id) upgrade(id);
    });
});

function formatMeows(num) {
    num = Number(num);
    if (num < 1000) return num.toString();
    const units = ["K", "M", "B", "T", "Q"];
    let unitIndex = -1;
    while (num >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }
    return `${num.toFixed(1)}${units[unitIndex]}`;
}

function Load() {
    document.getElementById("counter").innerHTML = formatMeows(getCookie("meow") || 0);
    const upgrades = ["tonque", "silly", "voice", "braincells", "catfood"];
    upgrades.forEach(upg => {
        let lvl = getCookie(upg) || 0;
        document.getElementById(upg).innerHTML = lvl;
        document.getElementById("C" + upg).innerHTML = formatMeows(upgradeCost(upg));
    });
}

function Meow() {
    meows = Number(meows) + multiplierCalc();
    meows = Math.floor(meows * 10) / 10;

    const Raudio = meowSounds[Math.floor(Math.random() * meowSounds.length)];
    Raudio.volume = muted ? 0 : 0.6;
    Raudio.play();

    addCookie("meow", meows);
    document.getElementById("counter").innerHTML = formatMeows(meows);
    Load();
}

function mute() {
    muted = !muted;
    console.log("Muted:", muted);
}

function multiplierCalc() {
    let base = 1;
    let tonque = Number(getCookie("tonque") || 0);
    let silly = Number(getCookie("silly") || 0);
    let voice = Number(getCookie("voice") || 0);

    let multiplier = base + tonque;
    multiplier *= (1 + 0.1 * silly);

    const critChance = Math.min(voice * 0.04, 0.8);
    const critMultiplier = 2 + (voice * 0.02);

    if (Math.random() < critChance) {
        multiplier *= critMultiplier;
        console.log(`Critical Meow! x${critMultiplier.toFixed(1)}`);
    }

    return Math.floor(multiplier * 10) / 10;
}

function AFKCalc() {
    let braincells = Number(getCookie("braincells") || 0);
    let catfood = Number(getCookie("catfood") || 0);
    let afkGain = braincells + (catfood * 0.5);
    meows = Number(meows) + afkGain;
    meows = Math.floor(meows * 10) / 10;
    addCookie("meow", meows);
    Load();
}

function upgradeCost(name) {
    let lvl = Number(getCookie(name) || 0);
    return Math.floor(50 * Math.pow(1.15, lvl));
}

function upgrade(name) {
    let lvl = Number(getCookie(name) || 0);
    let cost = upgradeCost(name);
    if (meows >= cost) {
        lvl++;
        meows -= cost;
        meows = Math.floor(meows * 10) / 10;
        addCookie(name, lvl);
        addCookie("meow", meows);
    }
    Load();
}

function addCookie(cname, value) {
    document.cookie = cname + "=" + Number(value);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

Load();