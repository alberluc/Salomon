import { Builder as SVGBuilder } from "../Utils/SVGHelper";
import { TweenMax } from 'gsap';
import { Bus } from "../../events/Bus";

export class Map {

    constructor (el, Script) {
        this.el = el;
        this.Script = Script;
        this.RunnersCourse = [];
        this.mapTotalLength = 0;
        this.pathEl = null;
        this.dividePercentage = 1;
        this.Bus = new Bus();
        this.animation = null;
    }

    init () {
        console.error('La méthode Map.init() doit être implémentée !')
    }

    load () {
        this.mapTotalLength = this.pathEl.getTotalLength();
    }

    start () {
        this.animate();
        this.init();
        this.setRunner(this.Script.User);

        this.Script.Bots.forEach(Bot => this.setRunner(Bot));
    }

    stop () {
        cancelAnimationFrame(this.animation);
    }

    setRunner (Runner) {
        let RunnerCourse = {
            image: SVGBuilder.circle(0, 0, Runner.size, Runner.color, Runner.className, Runner.strokeWidth, Runner.strokeColor),
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
        let currentPoint = (RunnerCourse.self.position.percentage / this.dividePercentage ) * this.mapTotalLength;
        let positionPath = this.pathEl.getPointAtLength(currentPoint);
        TweenMax.set(RunnerCourse.image, {
            x: positionPath.x,
            y: positionPath.y,
            force3D: true,
        })
    }

    animate () {
        this.RunnersCourse.forEach(RunnerCourse => this.setPosition(RunnerCourse));
        this.animation = requestAnimationFrame(this.animate.bind(this));
    }

}