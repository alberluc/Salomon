import TweenMax from 'gsap'

export class RaceIndication {

    constructor (el, duration) {
        this.el = el;
        this.duration = duration;
        this.hide();
    }

    showDuration (text, duration) {
        this.el.innerHTML = text;
        this.show();
        setTimeout(this.hide.bind(this), duration);
    }

    showCallback () {

    }

    show () {
        TweenMax.to(this.el, this.duration, { autoAlpha: 1 });
    }

    hide () {
        TweenMax.to(this.el, this.duration, { autoAlpha: 0 });
    }

}