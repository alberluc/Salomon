export class Chrono {

    constructor (el, time) {
        this.el = el;
        this.time = time;
        this.callback = null;
        this.timer = null;
        this.setText(this.time);
    }

    start (callback) {
        this.callback = callback;
        this.show();
        this.startTimer();
    }

    startTimer () {
        this.timer = setInterval(this.onTimerIncrement.bind(this), 1000);
    }

    stop() {
        this.stopTimer();
        this.hide();
        this.callback();
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    onTimerIncrement () {
        this.time--;
        this.setText(this.time);
        if (this.time === 0) this.stop();
    }

    show () {
        this.el.style.display = "flex";
    }

    hide () {
        this.el.style.display = "none";
    }

    setText (timerValue) {
        this.el.innerHTML = timerValue;
    }

}