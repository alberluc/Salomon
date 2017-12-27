export class UnitsBuilder {

    constructor (units) {
        this.units = units;
        this.distanceTotal = null;
    }

    define (value) {
        let find = null;
        this.units.forEach(unit => {
            if (value.indexOf(unit.key) !== -1) find = unit;
        });
        return {
            unit: find,
            value: parseFloat(value.replace(find !== null ? find.key : '', '')),
            percentage: this.getPercentage(value)
        };
    }

    convert (value) {
        if(value === 0) return this.define("0" + this.distanceTotal.unit.key);
        return this.define(String(parseFloat(value) * this.distanceTotal.value / 100) + this.distanceTotal.unit.key);
    }

    getPercentage (value) {
        return typeof this.distanceTotal !== "undefined" && this.distanceTotal !== null ? parseFloat(value) * 100 / parseFloat(this.distanceTotal.value) : 100;
    }

}