import { Runner } from "./Runner";

export class Bot extends Runner {

    constructor (bot, Script, position) {
        super(bot, Script, position);
        this.runInterval = null;
    }

    run () {
        this.runInterval = setInterval(this.incrementPosition.bind(this), this.speed);
    }

    stop () {
        clearInterval(this.runInterval);
    }

}