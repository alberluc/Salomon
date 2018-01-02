export class Builder {

    constructor () {}

    path () {

    }

    circle () {

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
        console.log(this, Point);
    }

}