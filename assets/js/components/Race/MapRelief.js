import { Converter } from './../Utils/SVGHelper'

export class MapRelief {

    constructor (el, Script) {
        this.el = el;
        this.Script = Script;
        this.Converter = new Converter(
            el.offsetHeight,
            el.offsetWidth,
            [Script.distanceInterval[0].distance.value, Script.distanceInterval[1].distance.value],
            [Script.altitudeInterval[0].altitude.value, Script.altitudeInterval[1].altitude.value],
            {x: 0, y: 0}
        );
    }

    load () {
        this.Converter.eval(this.Script.Points[1]);
    }

    build () {

    }

}
