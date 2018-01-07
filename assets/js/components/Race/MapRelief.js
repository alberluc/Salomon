import { Converter } from './../Utils/SVGHelper'
import { Builder as SVGBuilder } from './../Utils/SVGHelper'
import { Sort } from "../Utils/Sort";
import { Map } from "./Map"
import { TweenMax } from 'gsap';
import { ClassNames } from "../../../datas/dom";

export class MapRelief extends Map {

    constructor (el, Script) {
        super(el, Script);
        this.PointsAltitude = Sort.exists(Script.Points, 'altitude');
        this.classNameImage = ClassNames.RUNNER_IMAGE;
    }

    get PointsConverted () {
        return this.PointsAltitude.map(PointAltitude => this.Converter.getPoint({x: PointAltitude.distance.percentage, y: PointAltitude.altitude.percentage}));
    }

    init () {
        this.Converter = new Converter(
            this.el.offsetHeight,
            this.el.offsetWidth,
            {x: 0, y: 0}
        );
        this.build();
        this.load();
    }

    build () {
        this.svgEl = SVGBuilder.svg();
        this.pathEl = SVGBuilder.path(this.PointsConverted, 'white');
        this.svgEl.appendChild(this.pathEl);
        this.el.appendChild(this.svgEl);
    }

}
