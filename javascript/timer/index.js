durationInput = document.querySelector('#duration');
startBtn = document.querySelector('#start');
pauseBtn = document.querySelector('#pause');

var timer = new Timer(duration, startBtn, pauseBtn, {
    onStart() {
        console.log('Started');
    },
    onTick() {
        console.log('Ticked');
    },
    onComplete() {
        console.log('Completed');
    }
});