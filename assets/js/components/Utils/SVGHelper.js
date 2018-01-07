const Snap = require( "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js" );
const namespaceSVG = 'http://www.w3.org/2000/svg';

export class Builder {

    static path (PointsConverter, color) {
        let _el = document.createElementNS(namespaceSVG, 'path');
        _el.setAttribute('d', this.constructPath(PointsConverter));
        _el.style.stroke = color;
        return _el;
        //PointsConverter.forEach(PointConverter => console.log(PointConverter));
    }

    static constructPath (PointsConverter) {
        let s = '';
        PointsConverter.forEach((PointsConverter, index) => {
            if (index === 0) s += 'M ' + this.stringPoint(PointsConverter);
            else s += 'L ' + this.stringPoint(PointsConverter);
        });
        console.log(s);
        return s;
    }

    static stringPoint(PointsConverter) {
        return PointsConverter.x + ' ' + PointsConverter.y + ' ';
    }

    static circle (x, y, r, color) {
        let _el = document.createElementNS(namespaceSVG, 'circle')
        _el.setAttribute('cx', x);
        _el.setAttribute('cy', y);
        _el.setAttribute('r', r);
        _el.setAttribute('fill', color);
        return _el;
    }

    static svg (id, className) {
        let _el = document.createElementNS(namespaceSVG, 'svg');
        _el.setAttribute('id', id);
        _el.classList.add(className);
        return _el;
    }

}

export class Converter {

    constructor (height, width, origin) {
        this.height = height;
        this.width = width;
        this.origin = origin;
    }

    getPoint (Point) {
        return {
            x: this.width * Point.x,
            y: this.height * Point.y
        }
    }

}