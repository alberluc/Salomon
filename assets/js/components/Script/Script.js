import { UnitsBuilder as UnitsBuilderModel } from './UnitsBuilder'
import { Point as PointModel } from './Point'

export class Script {

    constructor (config) {
        this.config = config;
        this.UnitsBuilder = new UnitsBuilderModel(config.base.units);
        this.distanceTotal = this.UnitsBuilder.define(config.distance);
        this.UnitsBuilder.distanceTotal = this.distanceTotal;
        this.Points = this.setPoints(config.map);
        console.log(this);
    }

    setPoints (points) {
        return Object.keys(points).map(distance => new PointModel(points[distance], distance, this.UnitsBuilder));
    }

}