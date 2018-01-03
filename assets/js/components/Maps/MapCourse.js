export class MapCourse {

    constructor (el, Script) {
        this.el = el;
        this.Script = Script;
    }

    load () {

    }

    build () {
        this.el.innerHTML = this.Script.mapCourse.src;
    }

}