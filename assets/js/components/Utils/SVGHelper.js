import {Point} from "../Script/Point";

export class PathDrawer {

    constructor () {

    }

}

export class Converter {

    constructor (height, width, xInterval, yInterval, origin) {
        this.height = height;
        this.width = width;
        this.xInterval = xInterval;
        this.yInterval = yInterval;
        this.origin = origin;
    }

    eval (Point) {
        console.log(Point);
    }

}