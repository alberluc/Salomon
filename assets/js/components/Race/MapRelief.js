import { Converter } from './../Utils/SVGHelper'
import { Builder as SVGBuilder } from './../Utils/SVGHelper'

export class MapRelief {

    constructor (el, Script) {
        this.el = el;
        this.Script = Script;
        this.RunnersCourse = [];
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
        SVGBuilder.path();
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
