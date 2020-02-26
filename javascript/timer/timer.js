class Timer {
    constructor(durationInput, startBtn, pauseBtn, callBacks) {
        this.durationInput = durationInput;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;

        // callbacks: ways of sending data from child to parent function, 
        // first check whether callback parameter is passed or not
        if(callBacks) {  
            this.onStart = callBacks.onStart;
            this.onTick = callBacks.onTick;
            this.onComplete = callBacks.onComplete;
            this.onPause= callBacks.onPause;
        }

        this.startBtn.addEventListener('click', this.start);  // added event listeners
        this.pauseBtn.addEventListener('click', this.pause);
    }

    start = () => {
        // checks onStart callback function is passed or not
        if(this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 20); 
        // get instance of setInterval in global scope, so that it can be passed to clear the same
        this.startBtn.disabled = true; // disables the start button, once the timer is started
    }

    tick = () => {
        // const timeDuration = this.timeRemaining;
        // this.timeRemaining = timeDuration - 1;

        if(this.timeRemaining <= 0) {
            this.pause(); //  clear the time interval when it reaches to 0 
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
        if(this.onPause && this.timeRemaining > 0) {
            this.onPause();
        }
    }

    // getter function
    get timeRemaining() {
        return parseFloat(this.durationInput.value); //value from durationInput is a string, convert it to float
    }

    // setter function
    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}