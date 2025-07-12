import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("button[data-start]");

const clockface= document.querySelector(".timer");

class Timer {

    constructor({ onTick }) {
        this.onTick = onTick;
        this.isActive = false;
        this.intervalId = null;

        this.init();
    }

    init() {
        const time = this.getTimeComponent(0);
        this.onTick(time);
    }

    start() {
        if(this.isActive) {
            return;
        }

        this.isActive = true;
        const startTime = Date.now();

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;

            const time = this.getTimeComponent(deltaTime);
            this.onTick(time);
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.init();
        this.isActive = false;
    }

    getTimeComponent(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return {days, hours, mins, secs };
    }


    pad(value) {
        return String(value).padStart(2, "0");
    }
}

const time = new Timer({ onTick: updateClockface });

startBtn.addEventListener("click", time.start.bind(time));


function updateClockface({days, hours, mins, secs }) {
    document.querySelector('[data-days]').textContent = days;
    document.querySelector('[data-hours]').textContent = hours;
    document.querySelector('[data-minutes]').textContent = mins;
    document.querySelector('[data-seconds]').textContent = secs;

}