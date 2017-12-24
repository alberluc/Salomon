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
        this.distanceInterval = this.getDistanceInterval(this.Points);
        this.altitudeInterval = this.getAltitudeInterval(this.Points);
        console.log(this);
    }

    setPoints (map) {
        return Object.keys(map).map(distance => new PointModel(map[distance], distance, this.UnitsBuilder));
    }

    getDistanceInterval (Points) {
        return {
            asc: Sort.asc(Points, "distance.value"),
            desc: Sort.desc(Points, "distance.value")
        }
    }

    getAltitudeInterval (Points) {
        return {
            asc: Sort.asc(Points, "altitude.value"),
            desc: Sort.desc(Points, "altitude.value")
        }
    }

}