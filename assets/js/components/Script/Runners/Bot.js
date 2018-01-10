import { Runner } from "./Runner";
import { ClassNames } from "../../../../datas/dom";

export class Bot extends Runner {

    constructor (bot, Script, position) {
        super(bot, Script, position);
        this.runInterval = null;
        this.className = ClassNames.RUNNER_BOT;
    }

    run () {
        this.runInterval = setInterval(this.incrementPosition.bind(this), this.speed);

    }

    stop () {
        clearInterval(this.runInterval);
    }

}