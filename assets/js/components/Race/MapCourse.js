import { Builder as SVGBuilder } from './../Utils/SVGHelper'
import { TweenMax } from 'gsap';

export class MapCourse {

    constructor (el, Script) {
        this.el = el;
        this.Script = Script;
        this.RunnersCourse = [];
        this.mapTotalLength = 0;
    }

    build () {
        this.el.innerHTML = this.Script.mapCourse.src;
        this.pathEl = this.el.querySelector('path');
        this.mapTotalLength = this.pathEl.getTotalLength();
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
        let currentPoint = (RunnerCourse.self.position.percentage / 2) * this.mapTotalLength;
        let positionPath = this.pathEl.getPointAtLength(currentPoint);
        TweenMax.set(RunnerCourse.image, {
            x: positionPath.x,
            y: positionPath.y,
            force3D: true,
        })
    }

    animate () {
        this.RunnersCourse.forEach(RunnerCourse => this.setPosition(RunnerCourse));
        requestAnimationFrame(this.animate.bind(this));
    }

}