import { Flag as FlagModel} from './Flag'
import { UnitsBuilder } from "../Utils/UnitsBuilder";

export class Point {

    /**
     * Constructeur d'un point
     * @param point
     * @param distance int|string Distance du point dans le circuit
     * @param Script
     */
    constructor (point, distance) {
        this.UnitsBuilder = new UnitsBuilder();
        this.distance = this.UnitsBuilder.defineOrConvert(distance, 'distance');
        this.altitude = this.UnitsBuilder.define(point.altitude, 'altitude');
        this.ratioMove = point.ratioMove || 1;
        this.flag = typeof point.flag !== "undefined" ? new FlagModel(point.flag) : null;
    }

}