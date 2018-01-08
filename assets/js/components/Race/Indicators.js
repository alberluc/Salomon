import { Bus } from "../../events/Bus";
import ArrowSVG from "../../../img/arrow.svg";
import {Builder} from "../Utils/SVGHelper";
import {ClassNames, Ids} from "../../../datas/dom";

export class Time {

    /**
     * Construteur Time
     * @param el Element de destination
     * @param time Configuration de l'indicateur
     */
    constructor (el, time) {
        this.el = el;
        this.DateStart = null;
        this.self = time;
    }

    active () {
        this.DateStart = new Date();
        this.watch();
    }

    watch () {
        this.setText(this.calculTime(new Date()));
        requestAnimationFrame(this.watch.bind(this));
    }

    calculTime (Date) {
        return (Date.getTime() - this.DateStart.getTime()) * this.self.ratio;
    }

    setText(time) {
        let date = new Date(time);
        let hour = String(date.getHours()).length === 1 ? "0" + (date.getHours() - 1) : date.getHours() - 1;
        let minute = String(date.getMinutes()).length === 1 ? "0" + date.getMinutes() : date.getMinutes();
        let second = String(date.getSeconds()).length === 1 ? "0" + date.getSeconds() : date.getSeconds();
        this.el.innerHTML = hour + ':' + minute + ':' + second;
    }

}

export class Distance {

    constructor (el) {
        this.el = el;
        this.Bus = new Bus();
    }

    active () {
        this.Bus.listen(this.Bus.types.ON_USER_MOVE, this.setText.bind(this));
    }

    setText (params) {
        let position = params.position;
        this.el.innerHTML = (Math.round(position.value * 100) / 100) + position.unit.key;
    }

}

export class Gauge {

    constructor (el) {
        this.el = el;
        this.Bus = new Bus();
    }

    active () {
        this.Bus.listen(this.Bus.types.ON_GAUGE_LEVEL_CHANGE, this.onGaugeLevelChange.bind(this))
    }

    onGaugeLevelChange (params) {
        this.el.innerHTML = (Math.round(params.value * 10) / 10) + '%';
    }

}

export class DifferenceAltitude {

    constructor (el) {
        this.el = el;
        this.Bus = new Bus();
        this.arrowEl = null;
    }

    active () {
        this.arrowEl = document.createElement('div');
        this.Bus.listen(this.Bus.types.ON_CHANGE_POINT_ALTITUDE, this.onChangePointAltitude.bind(this))
    }

    onChangePointAltitude (params) {
        this.setText(this.calculDAltitude(params.current, params.next));
    }

    calculDAltitude(current, next) {
        let distance = next.distance.value - current.distance.value;
        let pente = next.altitude.value - current.altitude.value;
        return pente / distance;
    }

    setText (DA) {
        this.changeArrow(DA);
        this.el.innerHTML = (Math.round(DA * 10) / 10) + '%<br>' + this.arrowEl.outerHTML;
    }

    changeArrow (DA) {
        this.arrowEl.innerHTML = ArrowSVG;
        this.arrowEl.style.transform = 'rotate(' + (DA * -1) + 'deg)';
    }
}