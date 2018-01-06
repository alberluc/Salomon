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
            obj[base]['interval'] = obj[base]['interval'] || [];
            obj[base]['ratio'] = eval("bases." + base + '.ratio');
            eval("bases." + base + '.interval').forEach((baseValue, index) => {
                let value = this.define(baseValue, null);
                value.percentage = index;
                obj[base]['interval'].push(value)
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

    convert (value, baseName, convertWithRatio) {
        convertWithRatio = convertWithRatio !== false;
        if (value === 0) return this.define("0" + eval('this.bases.' + baseName + '.interval[0].unit.key'), baseName);
        let convertValue = parseFloat(value) * eval('this.bases.' + baseName + '.interval[1].value');
        if (convertWithRatio) convertValue = convertValue / eval('this.bases.' + baseName + '.ratio');
        return this.define(String(convertValue) + eval('this.bases.' + baseName + '.interval[1].unit.key'), baseName);
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
        return typeof baseName !== "undefined" && baseName !== null ? parseFloat(value) / parseFloat(eval('this.bases.' + baseName + '.interval[1].value')) : 1;
    }

}