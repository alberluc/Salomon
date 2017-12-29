export class Runner {

    constructor (Script, UnitBuilder, position) {
        this._position = position;
        this.Script = Script;
        this.UnitBuilder = UnitBuilder;
    }

    set position (value) {
        this._position = this.UnitBuilder.convert(value);
    }

    get position () {
        return this._position;
    }

    get ratioMove () {
        return this.Script.currentPoint.ratioMove;
    }

}