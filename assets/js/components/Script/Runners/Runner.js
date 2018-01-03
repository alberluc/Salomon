import { UnitsBuilder } from "../../Utils/UnitsBuilder";
import { Bus } from "../../../events/Bus";

export class Runner {

    constructor (runner, Script, position) {
        this.Script = Script;
        this.UnitBuilder = new UnitsBuilder();
        this.Bus = new Bus();
        this.name = runner.name;
        this.color = runner.color;
        this.size = runner.size;
        this.speed = runner.speed;
        this.arrived = false;
        this._position = this.UnitBuilder.convert(position, 'distance');
    }

    set position (value) {
        this._position = this.UnitBuilder.convert(value, 'distance');
    }

    get position () {
        return this._position;
    }

    get ratioMove () {
        return this.Script.currentPoint.ratioMove;
    }

    incrementPosition () {
        if (!this.arrived) {
            let incrementValue = this.Script.multiplyRatio * this.ratioMove;
            this.animate(incrementValue);
        }
    }

    animate (incrementValue) {
        let divide = 100;
        let i = 0;
        let incrementValueDivide = incrementValue / divide;
        let speedDivide = this.speed / divide;
        let incrementInterval = setInterval((function () {
            if (this.position.percentage >= 0.5) {
                clearInterval(incrementInterval);
                this.finishCourse();
            }
            else if (i >= divide) clearInterval(incrementInterval);
            else {
                this.position = this.position.percentage + incrementValueDivide;
                i++;
            }
        }).bind(this), speedDivide);
    }

    finishCourse () {
        this.position = 0;
        this.arrived = true;
        this.Bus.dispatch(this.Bus.types.ON_RUNNER_FINISHED, { Runner: this } );
    }


}