import { Sort } from "./Sort";

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
        let minPoint = Sort.getInterval(PointsConverter, 'y')[0];
        PointsConverter.forEach((PointConverter, index) => {
            PointConverter.y = PointConverter.y - minPoint.y;
            if (index === 0) s += 'M ' + this.stringPoint(PointConverter);
            else s += 'L ' + this.stringPoint(PointConverter);
        });
        return s;
    }

    static stringPoint(PointsConverter) {
        return PointsConverter.x + ' ' + PointsConverter.y + ' ';
    }

    static circle (x, y, r, color, className) {
        let _el = document.createElementNS(namespaceSVG, 'circle');
        _el.setAttribute('cx', x);
        _el.setAttribute('cy', y);
        _el.setAttribute('r', r);
        _el.setAttribute('fill', color);
        if (typeof className !== "undefined" && className !== '') _el.classList.add(className);
        return _el;
    }

    static svg (id, className) {
        let _el = document.createElementNS(namespaceSVG, 'svg');
        if (typeof id !== "undefined" && id !== '' ) _el.setAttribute('id', id);
        if (typeof className !== "undefined" && className !== '' ) _el.classList.add(className);
        return _el;
    }

}

export class Converter {

    constructor (height, width, margin) {
        this.height = height;
        this.width = width;
        this.margin = margin;
    }

    getPoint (Point) {
        return {
            x: (this.width - this.margin.x) * Point.x + (this.margin.x / 2),
            y: (this.height - this.margin.y)  * (1 - Point.y) + (this.margin.y / 2)
        }
    }

}