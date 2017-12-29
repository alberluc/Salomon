import { Flag as FlagModel} from './Flag'

export class Point {

    /**
     * Constructeur d'un point
     * @param point
     * @param distance int|string Distance du point dans le circuit
     * @param UnitBuilder
     */
    constructor (point, distance, UnitBuilder) {
        this.distance = this.setDistance(distance, UnitBuilder);
        this.altitude = UnitBuilder.define(point.altitude);
        this.flag = typeof point.flag !== "undefined" ? new FlagModel(point.flag) : null;
    }

    /**
     * Défini la valeur d'un point
     * @param value
     * @param UnitBuilder
     * @returns {unit, value}
     */
    setDistance (value, UnitBuilder) {
        let distance = UnitBuilder.define(value);
        if (distance.unit === null){
            distance = UnitBuilder.convert(value)
        }
        return distance;
    }

}