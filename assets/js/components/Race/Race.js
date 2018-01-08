import { Bus } from "../../events/Bus";
import { Ids} from "../../../datas/dom"
import { ViewHandler } from "../Utils/ViewHandler";
import { Sort } from "../Utils/Sort";
import { CountDown } from "./CountDown";
import { RaceEnd } from "./RaceEnd";


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
        this.CountDown = new CountDown(document.getElementById(Ids.RACE.COUNT_DOWN), Script.countDown);
        this.dataArduino = [];
        this.limitArray = 2;
        this.state = STATE.WAIT;
        this.Bus.listen(this.Bus.types.ON_RUNNER_FINISHED, this.onRunnerFinish.bind(this));
    }

    waitStart (callback) {
        let startViewEl = document.getElementById(Ids.VIEWS.START);
        startViewEl.addEventListener('click', this.onStartViewClick.bind(this, callback));
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

    onStartViewClick (callback) {
        ViewHandler.show(Ids.VIEWS.RACE);
        this.CountDown.start(this.onCountDownFinish.bind(this, callback));
    }

    onCountDownFinish (callback) {
        this.start();
        callback();
    }

}