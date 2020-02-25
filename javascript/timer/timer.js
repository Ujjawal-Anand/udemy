class Timer {
    constructor(durationInput, startBtn, pauseBtn, callBacks) {
        this.durationInput = durationInput;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;

        this.totalDuration = this.timeRemaining;

        if(callBacks) {
            this.onStart = callBacks.onStart;
            this.onTick = callBacks.onTick;
            this.onComplete = callBacks.onComplete;
        }

        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);
    }

    start = () => {
        if(this.onStart) {
            this.onStart(this.totalDuration);
        }
        this.tick();
        this.interval = setInterval(this.tick, 20);
        this.startBtn.disabled = true;
    }

    tick = () => {
        // const timeDuration = this.timeRemaining;
        // this.timeRemaining = timeDuration - 1;
        if(this.timeRemaining <= 0) {
            this.pause();
            if(this.onComplete) {
                this.onComplete();
            }
        }
        else {
            this.timeRemaining = this.timeRemaining - 0.02;

            if(this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
    }

    pause = () => {
        clearInterval(this.interval);
        this.startBtn.disabled = false;

    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}