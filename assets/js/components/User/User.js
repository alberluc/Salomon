export class User {

    /**
     * Constructeur User
     * @param Script
     * @param UnitBuilder
     * @param position
     */
    constructor (Script, UnitBuilder, position) {
        this.Script = Script;
        this.UnitBuilder = UnitBuilder;
        this._position = position;
    }

    set position (value) {
        this._position = this.UnitBuilder.convert(value);
    }

    get position () {
        return this._position;
    }

    get ratioMove () {
        return this.Script.currentPoint.ratioMoveRunner;
    }

    geUserCurrentlyPoint () {

    }

    incrementPosition () {
        console.log(this.ratioMove, this.position.percentage);
        this.position = this.ratioMove * this.position.percentage;
    }

    decrementPosition () {

    }

}