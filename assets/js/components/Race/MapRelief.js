import { Converter } from './../Utils/SVGHelper'
import { Builder as SVGBuilder } from './../Utils/SVGHelper'
import { Sort } from "../Utils/Sort";

export class MapRelief {

    constructor (el, Script) {
        this.el = el;
        this.Script = Script;
        this.RunnersCourse = [];
        this.PointsAltitude = Sort.exists(Script.Points, 'altitude');
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
        this.load();
        this.build();
    }

    load () {
        this.svgEl = SVGBuilder.svg();
        this.pathEl = SVGBuilder.path(this.PointsConverted, 'white');
        this.pathEl.style.transform = 'translateY(-100%)';
        this.svgEl.appendChild(this.pathEl);
        this.el.appendChild(this.svgEl);
    }

    build () {

        /*this.pathEl = this.el.querySelector('#lineRelief');
        this.mapTotalLength = this.pathEl.getTotalLength();*/
    }

    setRunner (Runner) {
        let RunnerCourse = {
            image: SVGBuilder.circle(0, 0, Runner.size, Runner.color),
            self: Runner
        };
        this.buildImage(RunnerCourse.image);
        this.setPosition(RunnerCourse);
        this.RunnersCourse.push(RunnerCourse);
    }

    buildImage (image) {
        this.pathEl.parentElement.appendChild(image);
    }

    setPosition (RunnerCourse) {
        let currentPoint = RunnerCourse.self.position.percentage * this.mapTotalLength;
        let positionPath = this.pathEl.getPointAtLength(currentPoint);
        RunnerCourse.image.setAttribute('cx', positionPath.x);
        RunnerCourse.image.setAttribute('cy', positionPath.y);
    }

}
