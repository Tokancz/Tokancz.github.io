let opened = false;
const menu = document.getElementById("menu");
const icon = document.getElementById("icon");

function TabOpen() {
    if(!opened){//neOtevřen
        menu.classList.add("burgrmenu");
        menu.classList.remove("navcenter");
    }
    else {
        menu.classList.remove("burgrmenu");
        menu.classList.add("navcenter");
    }
    opened = !opened;
    console.log("Tab interact");
}

icon.addEventListener("click", TabOpen);