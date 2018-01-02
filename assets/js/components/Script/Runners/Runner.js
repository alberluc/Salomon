import { UnitsBuilder } from "../../Utils/UnitsBuilder";
import { Bus } from "../../../events/Bus";

export class Runner {

    constructor (Script, position) {
        this.Script = Script;
        this.UnitBuilder = new UnitsBuilder();
        this.Bus = new Bus();
        this._position = this.UnitBuilder.convert(position, 'distance');
    }

    set position (value) {
        console.log(value)
        this._position = this.UnitBuilder.convert(value, 'distance');
    }

    get position () {
        return this._position;
    }

    get ratioMove () {
        return this.Script.currentPoint.ratioMove;
    }

    incrementPosition () {
        console.log(this.position)
        this.position = this.position.percentage + (this.Script.multiplyRatio * this.ratioMove);
    }

}