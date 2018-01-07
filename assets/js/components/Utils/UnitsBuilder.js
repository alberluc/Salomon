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
            obj[base] = {
                interval: bases[base].interval.map((baseValue, index) => {
                    let value = this.define(baseValue, null);
                    value.percentage = index;
                    return value;
                }),
                ratio: bases[base].ratio
            };
            obj[base].difference = obj[base].interval[1].value - obj[base].interval[0].value;
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

    convert (value, baseName, convertWithRatio) {
        convertWithRatio = convertWithRatio !== false;
        if (value === 0) return this.define("0" + this.bases[baseName].interval[0].unit.key, baseName);
        let convertValue = parseFloat(value) * this.bases[baseName].difference;
        if (convertWithRatio) convertValue = convertValue / this.bases[baseName].ratio;
        return this.define(String(convertValue) + this.bases[baseName].interval[1].unit.key, baseName);
    }

    defineOrConvert (value, baseName) {
        try{
            return this.define(value, baseName);
        }
        catch (err) {
            try {
                return this.convert(value, baseName);
            }
            catch (err) { console.error(err); }
        }
    }

    getPercentage (value, baseName) {
        let differenceValue = Math.abs(this.bases[baseName].interval[1].value - parseFloat(value) - this.bases[baseName].difference);
        return typeof baseName !== "undefined" && baseName !== null ? differenceValue / this.bases[baseName].difference : 1;
    }

}