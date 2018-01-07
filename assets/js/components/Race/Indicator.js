export class Indicator {

    constructor (el) {
        this.el = el;
    }

    changeValue (value) {
        this.el.innerHTML = value;
    }

}