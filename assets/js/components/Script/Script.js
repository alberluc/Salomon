import { UnitsBuilder as UnitsBuilderModel } from './../Utils/UnitsBuilder'
import { Sort } from './../Utils/Sort'
import { Point as PointModel } from './Point'

export class Script {

    constructor (config) {
        this.config = config;
        this.UnitsBuilder = new UnitsBuilderModel(config.base.units);
        this.distanceTotal = this.UnitsBuilder.define(config.distance);
        this.UnitsBuilder.distanceTotal = this.distanceTotal;
        this.Points = this.setPoints(config.map);
        this.distanceInterval = Sort.getInterval(this.Points, 'distance.value');
        this.altitudeInterval = Sort.getInterval(this.Points, 'altitude.value');
        console.log(this);
    }

    setPoints (map) {
        return Object.keys(map).map(distance => new PointModel(map[distance], distance, this.UnitsBuilder));
    }

}