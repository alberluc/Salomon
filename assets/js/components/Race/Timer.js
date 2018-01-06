import { ClassNames } from "../../../datas/dom";
import { TweenMax } from 'gsap';
import { Bus } from "../../events/Bus";

export class Timer {

    constructor (el) {
        this.el = el;
        this.levelEl = null;
        this.time = 5; //second
        this.Bus = new Bus();
        this.Bus.listen(this.Bus.types.ON_USER_DEHYDRATION, this.interact.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_OVERHYDRATION, this.interact.bind(this));
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
        console.log(this);
        this.reset();
        this.show();
        this.start(this.time);
    }

    reset () {
        TweenMax.set(this.levelEl, {x: 0});
    }

    start (time) {
        TweenMax.to(this.levelEl, time, {x: '-100%', onComplete: this.finish.bind(this)});
    }

    show () {
        this.el.style.display = 'block';
    }

    hide () {
        this.el.style.display = 'none';
    }

    finish () {

    }

}