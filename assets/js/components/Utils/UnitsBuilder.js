let instance = null;

export class UnitsBuilder {

    constructor (units, bases) {
        if (!instance) {
            this.units = units;
            this.bases = this.initBases(bases);
            instance = this;
        }
        return instance;
    }

    initBases (bases) {
        let obj = {};
        Object.keys(bases).forEach(base => {
            obj[base] = obj[base] || [];
            eval("bases." + base).forEach((baseValue, index) => {
                let value = this.define(baseValue, null);
                value.percentage = index;
                obj[base].push(value)
            });
        });
        return obj;
    }

    define (value, baseName) {
        let find = null;
        this.units.forEach(unit => {
            if (value.indexOf(unit.key) !== -1) find = unit;
        });
        return {
            unit: find,
            value: parseFloat(value.replace(find !== null ? find.key : '', '')),
            percentage: baseName === null ? 1 : this.getPercentage(value, baseName)
        };
    }

    convert (value, baseName) {
        if (value === 0) return this.define("0" + eval('this.bases.' + baseName + '[0].unit.key'), baseName);
        return this.define(String(parseFloat(value) * eval('this.bases.' + baseName + '[1].value')) + eval('this.bases.' + baseName + '[1].unit.key'), baseName);
    }

    defineOrConvert (value, baseName) {
        let converted = this.define(value, baseName);
        if (converted.unit === null){
            converted = this.convert(value, baseName)
        }
        return converted;
    }

    getPercentage (value, baseName) {
        return typeof baseName !== "undefined" && baseName !== null ? parseFloat(value) / parseFloat(eval('this.bases.' + baseName + '[1].value')) : 1;
    }

}