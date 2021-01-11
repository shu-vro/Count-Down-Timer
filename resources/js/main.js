// Select elements for time, selectors for time and popup and others.

const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const select_hour = document.querySelector("#select_hour");
const select_minute = document.querySelector("#select_minute");
const select_second = document.querySelector("#select_second");
const pop_up = document.querySelector(".pop_up");
const selects = document.querySelectorAll("select[name='timer']");
const Start_timeout_btn = document.querySelector(".Start_timeout");
const Select_timeout_btn = document.querySelector(
    ".Select_timeout"
);
const circles = document.querySelectorAll("canvas.circle");
let totalSeconds, interval;

let horn = new Audio();
horn.src = "resources/audio/Air Horn.mp3";

// Push options for select elements.

for (let i = 0; i <= 24; i++) {
    let option = document.createElement("option");
    option.textContent = i + " hours";
    option.value = i;
    select_hour.appendChild(option);
}
for (let i = 0; i < 60; i++) {
    let option = document.createElement("option");
    option.textContent = i + " minutes";
    option.value = i;
    select_minute.appendChild(option);
}
for (let i = 0; i < 60; i++) {
    let option = document.createElement("option");
    option.textContent = i + " seconds";
    option.value = i;
    select_second.appendChild(option);
}

selects.forEach((select) => {
    select.addEventListener("input", () => {
        let getSecond = select_second.value;
        let getMinute = select_minute.value;
        let getHour = select_hour.value;

        totalSeconds =
            getSecond * 1 + getMinute * 60 + getHour * 3600;
    });
});

// The popup animation.
Start_timeout_btn.addEventListener("click", () => {
    if (Start_timeout_btn.textContent == "Start Timeout") {
        pop_up.classList.toggle("inactive");

        if (pop_up.classList.contains("inactive")) {
            Select_timeout_btn.textContent = "Show Timeout Panel";
        } else {
            Select_timeout_btn.textContent = "Hide Panel";
        }

        let interval = setInterval(() => {
            let seconds = totalSeconds % 60;
            let minutes = Math.floor(totalSeconds / 60);
            let hours = Math.floor(totalSeconds / 3600);

            if (minutes >= 60) {
                let temp_minutes = totalSeconds / 60;
                minutes = Math.floor(temp_minutes % 60);
            }

            second.textContent = seconds;
            minute.textContent = minutes;
            hour.textContent = hours;
            
            if (totalSeconds == 0) {
                horn.play();
                select_second.value = 0;
                select_minute.value = 0;
                select_hour.value = 0;
                totalSeconds = 0;
                Start_timeout_btn.textContent = "Start Timeout";
                pop_up.classList.remove("ticking");
                clearInterval(interval);
                return;
            } else {
                pop_up.classList.add("ticking");
                Start_timeout_btn.textContent = "Stop Timeout";
                totalSeconds--;
            }
        }, 1000);
        circular_animation();
    } else if (Start_timeout_btn.textContent == "Stop Timeout") {
        horn.play();
        select_second.value = 0;
        select_minute.value = 0;
        select_hour.value = 0;
        second.textContent = 0;
        minute.textContent = 0;
        hour.textContent = 0;
        totalSeconds = 0;
        Start_timeout_btn.textContent = "Start Timeout";
        pop_up.classList.remove("ticking");
        clearInterval(interval);
        return;
    }
});

Select_timeout_btn.addEventListener("click", () => {
    pop_up.classList.toggle("inactive");

    if (pop_up.classList.contains("inactive")) {
        Select_timeout_btn.textContent = "Show Timeout Panel";
    } else {
        Select_timeout_btn.textContent = "Hide Panel";
    }
});

// The circular animation.
function circular_animation() {
    circles.forEach((circle) => {
        setInterval(() => {
            let text = circle.parentNode.querySelector(".text")
                .textContent;
            let max = circle.parentNode.querySelector(".text")
                .dataset.number;

            let angle = (text / max) * Math.PI * 2;
            let ctx = circle.getContext("2d");

            circle.width = 200;
            circle.height = 200;
            let radius = 96;
            let centerX = circle.width / 2;
            let centerY = circle.height / 2;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, angle, false);
            ctx.strokeStyle = "orangered";
            ctx.lineWidth = 8;
            ctx.stroke();
        }, 1000);
    });
}