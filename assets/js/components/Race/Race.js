import { Bus } from "../../events/Bus";
import {ClassNames, Ids} from "../../../datas/dom"
import { ViewHandler } from "../Utils/ViewHandler";
import { Sort } from "../Utils/Sort";
import { Indicator } from "./Indicators";


const STATE = {
    WAIT: "wait",
    RUN: "run",
    FINISH: "finish"
};

export class Race {

    constructor (Script) {
        this.Script = Script;
        this.End = new RaceEnd();
        this.Bus = new Bus();
        this.scores = [];
        this.dataArduino = [];
        this.limitArray = 2;
        this.state = STATE.WAIT;
        this.Bus.listen(this.Bus.types.ON_RUNNER_FINISHED, this.onRunnerFinish.bind(this));
    }

    waitStart (callback) {
        let startViewEl = document.getElementById(Ids.VIEWS.START);
        startViewEl.addEventListener('click', (function () {
            this.start();
            ViewHandler.show(Ids.VIEWS.RACE);
            callback();
        }).bind(this));
    }

    start () {
        this.Script.Bots.forEach(Bot => Bot.run());
        this.state = STATE.RUN;
    }

    /*this.dataArduino.splice(-this.limitArray.length - 1, this.dataArduino.length - this.limitArray);
     if (this.dataArduino[0] === "Right" && this.dataArduino[1] === "Left") {
     }*/

    finish () {
        let scoreUser = this.scores.length;
        this.completeScore();
        this.End.build(this.scores, scoreUser);

        TweenMax.fromTo (('.race-center') , 1, {opacity:1}, {opacity:0,display:'none'});
        TweenMax.delayedCall(1,() => {
            TweenMax.fromTo (('#endView') , 1, {opacity:0}, {
                onStart: () => {
                    document.getElementById(Ids.VIEWS.END).classList.add('view-active');
                },
                opacity:1,
                display:'flex',
            })
        });
        /*ViewHandler.show(Ids.VIEWS.END)*/
    }

    completeScore () {
        let botScores = Sort.asc(this.Script.Bots, 'speed');
        for (let i = 0; i < this.Script.Bots.length + 1; i++) {
            if (typeof this.scores[i] === "undefined") {
                this.scores[i] = botScores[i - 1]
            }
        }
    }

    onRunnerFinish (params) {
        if (this.state === STATE.RUN) {
            let Runner = params.Runner;
            this.scores.push(Runner);
            if (Runner.name === this.Script.User.name) {
                this.finish();
                this.state = STATE.FINISH;
            }
        }
    }

}

class RaceEnd {

    constructor () {
        this.scoreUserEl = document.getElementById(Ids.END.SCORE_USER);
        this.scoresEl = document.getElementById(Ids.END.SCORES);
    }

    build (scores, scoreUser) {
        this.buildScoreUser(scoreUser);
    }

    buildScoreUser (scoreUser) {
        let string = '';
        switch (scoreUser) {
            case 1 : {
                string = '1er';
                break;
            }
            case 2 : {
                string = '2ème';
                break;
            }
            default : {
                string = scoreUser + 'ème ...'
            }
        }
        this.scoreUserEl.innerHTML = string;
    }

}