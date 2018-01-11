import { Converter } from './../Utils/SVGHelper'
import { Builder as SVGBuilder } from './../Utils/SVGHelper'
import { Sort } from "../Utils/Sort";
import { Map } from "./Map"
import { TweenMax } from 'gsap';
import { ClassNames } from "../../../datas/dom";
import { Bus } from "../../events/Bus";

export class MapRelief extends Map {

    constructor (el, Script) {
        super(el, Script);
        this.Script = Script;
        this.PointsAltitude = Sort.exists(Script.Points, 'altitude');
        this.currentPointAltitude = this.PointsAltitude[0];
        this.Bus.listen(this.Bus.types.ON_USER_MOVE, this.onUserMove.bind(this));
    }

    get PointsConverted () {
        return this.PointsAltitude.map(PointAltitude => this.Converter.getPoint({x: PointAltitude.distance.percentage, y: PointAltitude.altitude.percentage}));
    }

    init () {
        this.Converter = new Converter(
            this.el.offsetHeight,
            this.el.offsetWidth,
            {x: 30, y: 70},
        );
        this.build();
        this.load();
        this.Bus.dispatch(this.Bus.types.ON_CHANGE_POINT_ALTITUDE, {
            current: this.PointsAltitude[0],
            next: this.PointsAltitude[1]
        });
    }

    build () {
        this.svgEl = SVGBuilder.svg();
        this.pathEl = SVGBuilder.path(this.PointsConverted, 'white', 30);
        this.svgEl.appendChild(this.pathEl);
        this.el.appendChild(this.svgEl);
    }

    onUserMove (params) {
        this.checkCurrentPointAltitude(params.position);
    }

    checkCurrentPointAltitude (position) {
        let points = this.PointsAltitude.filter(point => point.distance.percentage < position.percentage);
        let nextPoint = points[points.length - 1];
        if (typeof nextPoint !== "undefined" && this.currentPointAltitude.id !== nextPoint.id) {
            this.currentPointAltitude = nextPoint;
            this.Bus.dispatch(this.Bus.types.ON_CHANGE_POINT_ALTITUDE, {
                current: points[points.length - 1],
                next: this.PointsAltitude[points.length]
            });
        }
    }

}
