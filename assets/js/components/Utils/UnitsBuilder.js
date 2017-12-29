export class UnitsBuilder {

    constructor (units, total) {
        this.units = units;
        this.total = this.define(total);
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
        if(value === 0) return this.define("0" + this.total.unit.key);
        return this.define(String(parseFloat(value) * this.total.value / 100) + this.total.unit.key);
    }

    getPercentage (value) {
        return typeof this.total !== "undefined" && this.total !== null ? parseFloat(value) * 100 / parseFloat(this.total.value) : 100;
    }

}