import { ClassNames } from "../../../datas/dom";
import { TweenMax } from 'gsap';
import { Bus } from "../../events/Bus";

export class Timer {

    constructor (el, Script) {
        this.el = el;
        this.levelEl = null;
        this.pass = null;
        this.time = Script.timer.duration; //second
        this.Script = Script;
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.Bus = new Bus();
        this.Bus.listen(this.Bus.types.ON_USER_DEHYDRATION, this.interact.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_OVERHYDRATION, this.interact.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_CORRECT_HYDRATION, this.onPass.bind(this));
    }

    init () {
        this.hide();
        this.buildLevel();
    }

    buildLevel () {
        this.levelEl = document.createElement('div');
        this.levelEl.classList.add(ClassNames.TIMER_LEVEL);
        this.el.appendChild(this.levelEl);
    }

    interact () {
        this.show();
        this.start(this.time);
    }

    reset () {
        TweenMax.set(this.levelEl, {x: '0%'});
    }

    start (time) {
        this.pass = false;
        TweenMax.to(this.levelEl, time, {x: '-100%', onComplete: this.finish.bind(this)});
        document.addEventListener('click', this.onDocumentClick);
    }

    onPass () {
        this.pass = true;
        this.stop();
    }

    stop () {
        document.removeEventListener('click', this.onDocumentClick);
        TweenMax.killTweensOf(this.levelEl);
        this.hide();
        this.reset();
    }

    show () {
        this.el.style.display = 'block';
    }

    hide () {
        this.el.style.display = 'none';
    }

    finish () {
        this.stop();
        if (!this.pass) {
            this.Bus.dispatch(this.Bus.types.ON_TIMER_COMPLETE);
        }
    }

    onDocumentClick () {
        this.Bus.dispatch(this.Bus.types.ON_TIMER_CLICK);
    }

}