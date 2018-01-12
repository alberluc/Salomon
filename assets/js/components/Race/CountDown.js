import { TweenMax } from 'gsap';

export class CountDown {

    /**
     * Constructeur du Compteur
     * @param el Element cible
     * @param self
     */
    constructor (el, self) {
        this.el = el;
        this.self = self;
        this.callback = null;
        this.timer = null;
        this.setText(this.self.time);
        this.stroke = 0;
    }

    /**
     * Déclenche le compteur
     * @param callback
     */
    start (callback) {
        this.callback = callback;
        this.show();
        this.startTimer();
    }

    /**
     * Arrête le compteur
     */
    stop() {
        this.stopTimer();
        this.hide();
        this.callback();
    }

    /**
     * Déclenche un timer
     */
    startTimer () {
        this.timer = setInterval(this.onTimerIncrement.bind(this), 1000);

        this.setText(this.self.time);
        TweenMax.set('#circleTimer', {
            strokeDashoffset: this.stroke + "px"
        })
    }

    /**
     * Arrête le timer
     */
    stopTimer() {
        clearInterval(this.timer);
    }

    /**
     * Se déclenche lorsque le timer s'incrémente
     */
    onTimerIncrement () {
        this.self.time--;
        this.stroke += 314;
        this.setText(this.self.time);
        TweenMax.set('#circleTimer', {
            strokeDashoffset: this.stroke + "px"
        })
        if (this.self.time === 0) this.stop();

    }

    /**
     * Affiche le compteur
     */
    show () {
        this.el.style.display = "flex";
    }

    /**
     * Désaffiche le compteur
     */
    hide () {
        TweenMax.set('#raceChronoSvg',{
            autoAlpha: 0,
        });
        this.el.style.display = "none";
    }

    /**
     * Défini le texte du compteur
     * @param timerValue
     */
    setText (timerValue) {
        this.el.innerHTML = timerValue;
    }

}