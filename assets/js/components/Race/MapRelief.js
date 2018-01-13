import { Converter } from './../Utils/SVGHelper'
import { Builder as SVGBuilder } from './../Utils/SVGHelper'
import { Sort } from "../Utils/Sort";
import { Map } from "./Map"
import { TweenMax } from 'gsap';
import { Image } from "../../../datas/Medias";
import {ClassNames} from "../../../datas/dom";

export class MapRelief extends Map {

    constructor (el, Script) {
        super(el, Script);
        this.Script = Script;
        this.PointsAltitude = Sort.exists(Script.Points, 'altitude');
        this.currentPointAltitude = this.PointsAltitude[0];
        this.Bus.listen(this.Bus.types.ON_USER_MOVE, this.onUserMove.bind(this));
        this.checkpointsEl = [];
        this.id = 0;
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
        this.buildCheckPoints();
        this.load();
        this.Bus.dispatch(this.Bus.types.ON_CHANGE_POINT_ALTITUDE, {
            current: this.PointsAltitude[0],
            next: this.PointsAltitude[1]
        });
    }

    build () {
        this.svgEl = SVGBuilder.svg();
        this.pathEl = SVGBuilder.path(this.PointsConverted, 'white', 30, 'root');

        let totalLenght = this.pathEl.getTotalLength();
        this.pathEl.style.strokeDasharray = totalLenght;
        this.pathEl.style.strokeDashoffset = totalLenght;

        this.pathEl.classList.add('mapReliefSvg');
        setTimeout(() => {
            this.pathEl.classList.add('active');
            // TPM POUR LA VOIX
            setTimeout(() => {
                let checkpoint = document.querySelectorAll('.mapRelief_checkpoint');
                for(let i = 0; i < checkpoint.length; i++) {
                    checkpoint[i].classList.add('activeCheckPoint');
                    console.log(checkpoint[i]);
                }
            },2000)
        },400)
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

    buildCheckPoints() {
        let CheckPoints = Sort.exists(this.Script.Points, 'gauge.goto');
        CheckPoints.forEach(CheckPoint => this.buildCheckPoint(CheckPoint))
    }

    buildCheckPoint (CheckPoint) {
        this.id += 1;

        let CheckPointCoords = this.Converter.getPoint({x: CheckPoint.distance.percentage, y: 0});
        let svg = SVGBuilder.extract(Image.Checkpoint, 'svg');
        svg.classList.add(ClassNames.CHECKPOINT);
        let g = svg.querySelector('rect').parentElement;
        g.setAttribute("transform", "translate(" + CheckPointCoords.x + ")");
        this.checkpointsEl[CheckPoint.id] = svg;
        this.svgEl.prepend(this.checkpointsEl[CheckPoint.id]);
        this.checkpointsEl[CheckPoint.id].classList.add('viewCheckPoint_' + this.id);
        g.prepend(SVGBuilder.path([{x: (svg.getBBox().width / 2) + 1, y: 0}, {x: (svg.getBBox().width / 2) + 1, y:  100}], "white", '', 'mapRelief_checkpoint_bar'));

    }

}
