import { ClassNames } from "../../../datas/dom";
import { Bus } from "../../events/Bus";
import { Sort } from "../Utils/Sort";
import { TweenMax } from "gsap";

const TYPES = {
    LESS_THAN: 'less-than',
    GREATER_THAN: 'greater-than'
};

export class Gauge {

    constructor (el, Script) {
        this.el = el;
        this.baseBarLevel = 50;
        this.userPercentageMemory = 0;
        this.Script = Script;
        this.self = Script.gauge;
        this.barLevel = {};
        this.PointsGauge = Sort.exists(Script.Points, 'gauge');
        this.Bus = new Bus();
        this.currentPointGaugeIndex = 0;
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
        this.templateWave = `
        <div class='wave one'></div>
        <div class='wave two'></div>
        <div class='wave three'></div>`;
        this.barLevel.el = document.createElement("div");
        this.barLevel.el.classList.add(ClassNames.GAUGE_BAR_LEVEL);
        this.setPositionBarLevel(this.baseBarLevel);
        this.el.appendChild(this.barLevel.el);
        this.barLevel.el.innerHTML = this.templateWave;
    }

    setPositionBarLevel (value) {
        this.checkDangerState(value);
        TweenMax.set(this.barLevel.el, {
            y: (100 - value) + "%",
            force3D: true,
        });
    }

    onUserMove () {
        let newPositionBarLevel = this.baseBarLevel + this.calculBarLevel();
        this.currentBarLevel = newPositionBarLevel;
        this.setPositionBarLevel(newPositionBarLevel);
    }

    calculBarLevel () {
        let addPositionValue = (this.Script.User.position.percentage - this.userPercentageMemory) / this.ratio.distance * this.ratio.level;
        if (this.ratio.sign === 1) {
            return - addPositionValue;
        }
        else if (this.ratio.sign === -1) {
            return addPositionValue;
        }
    }

    get currentPointGauge () {
        return this.PointsGauge[this.currentPointGaugeIndex];
    }

    set ratio (value) {
        let nextPoint = this.nextPointGauge();
        console.log(nextPoint, this.currentPointGauge);
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
        this.setPositionBarLevel(newPositionBarLevel);
        this.currentBarLevel = newPositionBarLevel;
        if (this.currentBarLevel > this.PointsGauge[this.currentPointGaugeIndex + 1].gauge.goto) {
            this.currentPointGaugeIndex++;
            this.userPercentageMemory = this.Script.User.position.percentage;
            this.baseBarLevel = this.currentBarLevel;
            this.ratio = this.currentBarLevel;
            this.Bus.dispatch(this.Bus.types.ON_USER_CORRECT_HYDRATION);
        }
    }

    checkDangerState (valueLevel) {
        let danger = false;
        this.self.Levels.forEach(Level => {
            if (typeof Level.type !== "undefined" && Level.type !== null) {
                switch (Level.type) {
                    case TYPES.LESS_THAN: {
                        if (valueLevel < parseFloat(Level.value)) { this.setStateDanger(); danger = true; }
                        break;
                    }
                    case  TYPES.GREATER_THAN: {
                        if (valueLevel > parseFloat(Level.value)) { this.setStateDanger(); danger = true; }
                        break;
                    }
                    default: {
                        console.error('Type "' + Level.type + '" not exist !');
                    }
                }
            }
        });
        if (!danger) { this.removeStateDanger(); }
    }

    setStateDanger () {
        document.body.classList.add(ClassNames.BODY_STATE_DANGER)
    }

    removeStateDanger () {
        document.body.classList.remove(ClassNames.BODY_STATE_DANGER)
    }

}