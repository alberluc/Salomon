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
        this.ratioOnDanger = runner.ratioOnDanger;
        this.strokeWidth = runner.strokeWidth;
        this.strokeColor = runner.strokeColor;
        this.arrived = false;
        this.reduceSpeed = false;
        this._position = this.UnitBuilder.convert(position, 'distance', false);
        this.time = null;
        this.Bus.listen(this.Bus.types.ON_USER_DEHYDRATION, this.onReduceSpeed.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_OVERHYDRATION, this.onReduceSpeed.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_CORRECT_HYDRATION, this.onCorrectHydration.bind(this));


    }

    onReduceSpeed () {
        this.reduceSpeed = true;
    }

    set position (value) {
        this._position = this.UnitBuilder.convert(value, 'distance', false);
    }

    get position () {
        return this._position;
        this.draw();
    }

    get ratioMove () {
        if (this.reduceSpeed) return this.Script.currentPoint.ratioMove * this.ratioOnDanger;
        return this.Script.currentPoint.ratioMove;
    }

    incrementPosition () {
        if (!this.arrived) {
            let incrementValue = this.Script.multiplyRatio * this.ratioMove;
            this.animate(incrementValue);
        }
    }

    /*animate (incrementValue) {
        let divide = 60;
        let i = 0;
        let incrementValueDivide = incrementValue / divide;
        let speedDivide = this.speed / divide;
        let incrementInterval = setInterval((function () {
            if (this.position.percentage >= 1) {
                clearInterval(incrementInterval);
                this.finishCourse();
            }
            else if (i >= divide) clearInterval(incrementInterval);
            else {
                this.position = this.position.percentage + incrementValueDivide;
                i++;
            }

        }).bind(this), speedDivide);
    }*/

    animate (incrementValue) {
        this.position = this.position.percentage + incrementValue;
        if (this.position.percentage >= 1) {
            this.finishCourse();
        }
    }

    finishCourse () {
        this.position = 1;
        this.arrived = true;
        this.Bus.dispatch(this.Bus.types.ON_RUNNER_FINISHED, { Runner: this } );
    }

    onCorrectHydration () {
        if (this.reduceSpeed)
            this.reduceSpeed = false;
    }

}
