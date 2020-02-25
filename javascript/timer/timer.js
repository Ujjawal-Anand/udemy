class Timer {
    constructor(durationInput, startBtn, pauseBtn, callBacks) {
        this.durationInput = durationInput;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;

        if(callBacks) {
            this.onStart = callBacks.onStart;
            this.onTick = callBacks.onTick;
            this.onComplete = callBacks.onComplete;
        }

        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);
    }

    start = () => {
        this.tick();
        this.interval = setInterval(this.tick, 1000);

        if(this.onStart) {
            this.onStart();
        }
    }

    tick = () => {
        // const timeDuration = this.timeRemaining;
        // this.timeRemaining = timeDuration - 1;
        if(this.timeRemaining < 1) {
            this.pause();
            if(this.onComplete) {
                this.onComplete();
            }
        }
        else {
            this.timeRemaining = this.timeRemaining - 1;

            if(this.onTick) {
                this.onTick();
            }
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