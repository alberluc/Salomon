import { Converter } from './../Utils/SVGHelper'

export class MapReliefModel {

    constructor (el, Script) {
        this.el = el;
        this.Script = Script;
        this.Converter = new Converter(
            el.offsetHeight,
            el.offsetWidth,
            Script.distanceInterval,
            Script.altitudeInterval,
            {x: 0, y: 0}
        );
    }

    load () {
        this.Converter.eval(this.Script.Points[1]);
    }

    build () {

    }

}
