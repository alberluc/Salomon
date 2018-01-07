const Snap = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );

export class Builder {

    static path () {
        console.log(Snap)
    }

    static circle (x, y, r, color) {
        let _el = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        _el.setAttributeNS(null, 'cx', x);
        _el.setAttributeNS(null, 'cy', y);
        _el.setAttributeNS(null, 'r', r);
        _el.setAttributeNS(null, 'fill', color);
        return _el;
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