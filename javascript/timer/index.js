const durationInput = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const circle = document.querySelector('circle')
let duration = 0;
let currentOffset = 0;
let pausedTime = 0;


const perimeter = circle.getAttribute('r')*Math.PI*2;
circle.setAttribute('stroke-dasharray', perimeter)

var timer = new Timer(durationInput, startBtn, pauseBtn, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(remainingTime) {
        currentOffset = perimeter * remainingTime/duration - perimeter; //formula to calculate offset
        circle.setAttribute('stroke-dashoffset', currentOffset)
    },
    onComplete() {
        console.log('Completed');
    },
    onPause() {
        // on pause
    }
});