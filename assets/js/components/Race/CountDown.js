import { TweenMax } from 'gsap';

export class CountDown {

    constructor (el, self) {
        console.log(el, self)
        this.el = el;
        this.self = self;
        this.callback = null;
        this.timer = null;
        this.setText(this.self.time);
        this.stroke = 0;
    }

    start (callback) {
        this.callback = callback;
        this.show();
        this.startTimer();
    }

    startTimer () {
        this.timer = setInterval(this.onTimerIncrement.bind(this), 1000);
        this.setText(this.self.time);
        TweenMax.set('#circleTimer', {
            strokeDashoffset: this.stroke + "px"
        })
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
        this.self.time--;
        this.stroke += 314;
        this.setText(this.self.time);
        TweenMax.set('#circleTimer', {
            strokeDashoffset: this.stroke + "px"
        })
        if (this.self.time === 0) this.stop();

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