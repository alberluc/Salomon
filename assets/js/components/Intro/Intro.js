import { Ids } from "../../../datas/dom"
import { ViewHandler } from "../Utils/ViewHandler";
import { Sound } from "../Sound/Sound";


export class Intro {

    constructor () {
        this.timeToPlay();
    }

    timeToPlay () {
        let startTimeToPlay = document.getElementById(Ids.INIT.PLAY);
        startTimeToPlay.addEventListener('click', () => {
            this.intruction();
            ViewHandler.show(Ids.INIT.SITE);
        });
    }

    intruction () {
        this.sound = new Sound(1);
        this.sound.play();
    }

    finish () {
        let scoreUser = this.scores.length;
        this.completeScore();
        this.End.build(this.scores, scoreUser);
        ViewHandler.show(Ids.VIEWS.END)
    }
}