import { Runner } from "./Runner";

export class Bot extends Runner {

    constructor (bot, Script, position) {
        super(Script, position);
        this.name = bot.name;
        this.color = bot.color;
        this.speed = bot.speed;
        this.runInterval = null;
    }

    run () {
        this.runInterval = setInterval(this.incrementPosition.bind(this), this.speed);
    }

    stop () {
        clearInterval(this.runInterval);
    }

}