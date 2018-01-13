import { TweenMax } from 'gsap';
import { Map } from "./Map"

export class MapCourse extends Map {

    constructor (el, Script) {
        super(el, Script);
        this.dividePercentage = 2;
    }

    init () {
        this.build();
        this.load();
    }

    build () {
        this.el.innerHTML = this.Script.mapCourse.src;
        this.pathEl = this.el.querySelector('path');
    }

}