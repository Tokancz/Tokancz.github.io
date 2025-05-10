const kittens = document.getElementsByClassName("kitty");

for (let i = 0; i < kittens.length; i++) {
    kittens[i].addEventListener("click", Meow);
}

function Meow() {
    const sounds = [
        new Audio('/Audio/Meow.mp3'),
        new Audio('/Audio/Meow2.mp3'),
        new Audio('/Audio/Meow3.mp3'),
        new Audio('/Audio/Meow4.mp3'),
        new Audio('/Audio/Meow5.mp3'),
        new Audio('/Audio/Meow6.mp3'),
        new Audio('/Audio/Meow7.mp3'),
    ];
    const Raudio = sounds[Math.floor(Math.random() * sounds.length)];
    Raudio.volume = 0.4;
    Raudio.play();
}

// Elements to update
const container = document.getElementById("kittensContainer");
const KoTD = document.getElementById("kitty");
const kittenlist = [];

// Get today's date string
const todayKey = new Date().toISOString().split("T")[0]; // e.g. "2025-05-10"

fetch("Scripts/kittens.json")
    .then(res => res.json())
    .then(kittens => {
        kittens.forEach(kitten => kittenlist.push(kitten));

        let saved = localStorage.getItem("kotd");
        let parsed;

        if (saved) {
            parsed = JSON.parse(saved);
            if (parsed.date !== todayKey) {
                parsed = pickNewKitten(todayKey);
            }
        } else {
            parsed = pickNewKitten(todayKey);
        }

        displayKitten(parsed.kitten);
    })
    .catch(error => {
        console.error("Failed to load kittens.json:", error);
    });

function pickNewKitten(dateKey) {
    const randomKitten = kittenlist[Math.floor(Math.random() * kittenlist.length)];
    const data = { date: dateKey, kitten: randomKitten };
    localStorage.setItem("kotd", JSON.stringify(data));
    return data;
}

function displayKitten(kitten) {
    document.getElementById("kitty").src = kitten.image;
    document.getElementById("name").innerText = kitten.name;
    document.getElementById("age").innerText = kitten.age;
    document.getElementById("breed").innerText = kitten.breed;
    document.getElementById("special").innerText = kitten.special;
}
