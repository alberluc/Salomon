import { Flag as FlagModel} from './Flag'
import { UnitsBuilder } from "../Utils/UnitsBuilder";

export class Point {

    /**
     * Constructeur d'un point
     * @param point
     * @param distance int|string Distance du point dans le circuit
     * @param index
     */
    constructor (point, distance, index) {
        this.UnitsBuilder = new UnitsBuilder();
        this.id = index;
        this.distance = typeof distance !== "undefined" ? this.UnitsBuilder.defineOrConvert(parseFloat(distance), 'distance') : null;
        this.altitude = typeof point.altitude !== "undefined" ? this.UnitsBuilder.define(point.altitude, 'altitude') : null;
        this.gauge = point.gauge;
        this.ratioMove = point.ratioMove || 1;
        this.Flag = typeof point.flag !== "undefined" ? new FlagModel(point.flag) : null;
    }

}