import { ClassNames } from "../../../datas/dom";
import { Bus } from "../../events/Bus";
import { Sort } from "../Utils/Sort";

export class Gauge {

    constructor (el, Script) {
        this.el = el;
        this.baseBarLevel = 50;
        this.Script = Script;
        this.self = Script.gauge;
        this.barLevel = {};
        this.PointsGauge = Sort.exists(Script.Points, 'gauge');
        this.Bus = new Bus();
        this.currentPointGauge = this.Script.Points[0];
        this.currentBarLevel = null;
        this.ratio = this.baseBarLevel;
        this.Bus.listen(this.Bus.types.ON_USER_MOVE, this.onUserMove.bind(this));
        this.Bus.listen(this.Bus.types.ON_TIMER_CLICK, this.onTimerClick.bind(this));
    }

    build () {
        this.buildMarksLevels();
        this.buildBarLevel();
    }

    buildMarksLevels () {
        this.self.Levels.forEach(Level => {
            Level.el = document.createElement("div");
            Level.el.classList.add(ClassNames.GAUGE_LEVEL);
            Level.el.style.height = parseFloat(Level.value) + "%";
           this.el.appendChild(Level.el);
        });
    }

    buildBarLevel () {
        this.barLevel.el = document.createElement("div");
        this.barLevel.el.classList.add(ClassNames.GAUGE_BAR_LEVEL);
        this.setPositionBarLevel(this.baseBarLevel);
        this.el.appendChild(this.barLevel.el);
    }

    setPositionBarLevel (value) {
        this.barLevel.el.style.transform = 'translateY(' + (100 - value)  + '%)';
    }

    onUserMove () {
        let newPositionLevel = this.baseBarLevel + this.calculBarLevel();
        this.currentBarLevel = newPositionLevel;
        this.setPositionBarLevel(newPositionLevel);
    }

    calculBarLevel () {
        let addPositionValue = this.Script.User.position.percentage / this.ratio.distance * this.ratio.level;
        if (this.ratio.sign === 1) {
            return - addPositionValue;
        }
        else if (this.ratio.sign === -1) {
            return addPositionValue;
        }
        else {
            console.log('ratio = 0')
        }
    }

    set ratio (value) {
        let nextPoint = this.nextPointGauge();
        let intervalPercetagePoints = nextPoint.distance.percentage - this.currentPointGauge.distance.percentage;
        let intervalBarLevel = value - nextPoint.gauge.level;
        this._ratio = {
            sign: Math.sign(intervalBarLevel),
            distance: intervalPercetagePoints / 100,
            level: Math.abs(intervalBarLevel) / 100
        };
    }

    get ratio () {
        return this._ratio;
    }

    nextPointGauge () {
        return this.PointsGauge.filter(PointGauge => PointGauge.distance.percentage > this.Script.User.position.percentage)[0];
    }

    onTimerClick () {
        let newPositionBarLevel = this.currentBarLevel + this.Script.danger.clickValue;
        this.currentBarLevel = newPositionBarLevel;
        this.setPositionBarLevel(newPositionBarLevel);
        if (this.currentBarLevel > this.baseBarLevel) {
            this.baseBarLevel = this.currentBarLevel;
            this.Bus.dispatch(this.Bus.types.ON_USER_CORRECT_HYDRATION);
        }
    }

}