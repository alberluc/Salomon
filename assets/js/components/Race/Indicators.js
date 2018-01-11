import { Bus } from "../../events/Bus";
import ArrowSVG from "../../../img/arrow.svg";
import { Sort } from "../Utils/Sort";

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
        this.animation = null;
    }

    active () {
        this.DateStart = new Date();
        this.watch();
    }

    disable () {
        cancelAnimationFrame(this.animation);
    }

    watch () {
        this.setText(this.calculTime(new Date()));
        this.animation = requestAnimationFrame(this.watch.bind(this));
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
        this.run = true;
    }

    disable () {
        this.run = false;
    }

    active () {
        this.Bus.listen(this.Bus.types.ON_USER_MOVE, this.setText.bind(this));
        this.el.innerHTML = "0km";
    }

    setText (params) {
        if (this.run) {
            let position = params.position;
            this.el.innerHTML = (Math.round(position.value * 100) / 100) + position.unit.key;
        }
    }

}

export class Gauge {

    constructor (el) {
        this.el = el;
        this.Bus = new Bus();
        this.run = true;
    }

    disable () {
        this.run = false;
    }

    active () {
        this.Bus.listen(this.Bus.types.ON_GAUGE_LEVEL_CHANGE, this.onGaugeLevelChange.bind(this));
        this.onGaugeLevelChange({ value: 50 });
    }

    onGaugeLevelChange (params) {
        if (this.run) {
            this.el.innerHTML = (Math.round(params.value * 10) / 10) + '%';
        }
    }

}

export class DifferenceAltitude {

    constructor (el) {
        this.el = el;
        this.Bus = new Bus();
        this.arrowEl = null;
        this.run = true;
    }

    active () {
        this.arrowEl = document.createElement('div');
        this.arrowEl.className = "indicatorDArrow";
        this.Bus.listen(this.Bus.types.ON_CHANGE_POINT_ALTITUDE, this.onChangePointAltitude.bind(this))
    }

    disable () {
        this.run = false;
    }

    onChangePointAltitude (params) {
        if (this.run) {
            this.setText(this.calculDAltitude(params.current, params.next));
        }
    }

    calculDAltitude(current, next) {
        let distance = next.distance.value - current.distance.value;
        let pente = next.altitude.value - current.altitude.value;
        return pente / distance;
    }

    setText (DA) {
        this.changeArrow(DA);
        this.el.innerHTML = (Math.round(DA * 10) / 10) + '%' + this.arrowEl.outerHTML;
    }

    changeArrow (DA) {
        this.arrowEl.innerHTML = ArrowSVG;
        this.arrowEl.style.transform = 'rotate(' + (DA * -1) + 'deg)';
    }
}

export class Position {

    constructor (el, User, MapRelief) {
        this.el = el;
        this.Bus = new Bus();
        this.MapRelief = MapRelief;
        this.User = User;
        this.animation = null;
    }

    active () {
        let info = this.calculPosition(this.MapRelief.RunnersCourse);
        this.setText(info.position, info.total);
        this.animation = requestAnimationFrame(this.active.bind(this));
    }

    disable () {
        cancelAnimationFrame(this.animation);
    }

    calculPosition (Runners) {
        let runners = Sort.desc(Runners, 'self.position.value');
        let position = 0;
        let total = runners.length;
        runners.forEach((runner, index) => { if (runner.self.name === this.User.name) position = index + 1; });
        return { position, total }
    }

    setText (position, total) {
        switch (parseFloat(position)) {
            case 1 : {
                position = '1 er';
                break;
            }
            default : {
                position = position + ' ème';
            }
        }
        this.el.innerHTML = position;
    }

}
