import { ClassNames } from "../../../datas/dom";
import { Bus } from "../../events/Bus";

export class Gauge {

    constructor (el, Script) {
        this.el = el;
        this.baseBarLevelValue = 50;
        this.Script = Script;
        this.self = Script.gauge;
        this.barLevel = {};
        this.Bus = new Bus();
        this.Bus.listen(this.Bus.types.ON_USER_MOVE, this.onUserMove.bind(this))
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
        this.setPositionBarLevel(this.baseBarLevelValue);
        this.el.appendChild(this.barLevel.el);
    }

    setPositionBarLevel (value) {
        this.barLevel.el.style.transform = 'translateY(' + (100 - value)  + '%)';
    }

    onUserMove () {

    }

}