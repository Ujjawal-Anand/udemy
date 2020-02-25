class Timer {
    constructor(durationInput, startBtn, pauseBtn) {
        this.durationInput = durationInput;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;

        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);
    }

    start = () => {
        this.tick();
        this.interval = setInterval(this.tick, 1000);
    }

    tick = () => {
        // const timeDuration = this.timeRemaining;
        // this.timeRemaining = timeDuration - 1;
        if(this.timeRemaining < 1) {
            this.pause();
        }
        else {
            this.timeRemaining = this.timeRemaining - 1;
        }
    }

    pause = () => {
        clearInterval(this.interval);
    }

    get timeRemaining() {
        return this.durationInput.value;
    }

    set timeRemaining(time) {
        this.durationInput.value = time;
    }
}

durationInput = document.querySelector('#duration');
startBtn = document.querySelector('#start');
pauseBtn = document.querySelector('#pause');

var timer = new Timer(duration, startBtn, pauseBtn);