import { Bus } from "../../events/Bus";
import { Ids} from "../../../datas/dom"
import { ViewHandler } from "../Utils/ViewHandler";
import { Sort } from "../Utils/Sort";
import { CountDown } from "./CountDown";
import { RaceEnd } from "./RaceEnd";
import { transitionRace } from "./transitionRace";


const STATE = {
    WAIT: "wait",
    RUN: "run",
    FINISH: "finish"
};

export class Race {

    constructor (Script, callbacks) {
        this.Script = Script;
        this.End = new RaceEnd();
        this.Bus = new Bus();
        this.scores = [];
        this.CountDown = new CountDown(document.getElementById(Ids.RACE.COUNT_DOWN), Script.countDown);
        this.dataArduino = [];
        this.limitArray = 2;
        this.state = STATE.WAIT;
        this.onStart = callbacks.onStart;
        this.onFinish = callbacks.onFinish;
        this.onViewAppear = callbacks.onViewAppear;
        this.initTransition();
        this.Bus.listen(this.Bus.types.ON_RUNNER_FINISHED, this.onRunnerFinish.bind(this));
        this.Bus.listen(this.Bus.types.ON_PRESENTATION_ELEMENT_FINISH, this.onCountDownStart.bind(this));
    }
    initTransition() {
        this.transition = new transitionRace();
    }


    waitStart () {
        let startViewEl = document.getElementById(Ids.VIEWS.START);
        startViewEl.addEventListener('click', this.onStartViewClick.bind(this));
    }

    start () {
        this.Script.Bots.forEach(Bot => Bot.run());
        this.state = STATE.RUN;
        this.Bus.dispatch(this.Bus.types.ON_CHANGE_CURRENT_POINT, { id: 0 });
    }

    /*this.dataArduino.splice(-this.limitArray.length - 1, this.dataArduino.length - this.limitArray);
     if (this.dataArduino[0] === "Right" && this.dataArduino[1] === "Left") {
     }*/

    finish () {
        this.onFinish();
        let scoreUser = this.scores.length;
        this.completeScore();
        this.End.build(this.scores, scoreUser);
        TweenMax.fromTo (('.steps-opacity') , 1, {opacity:1}, {opacity:0,display:'none'});
        TweenMax.delayedCall(1,() => {
            TweenMax.fromTo (('#endView') , 1, {opacity:0}, {
                onStart: () => {
                    document.getElementById(Ids.VIEWS.END).classList.add('view-active');
                },
                opacity:1,
                display:'flex',
                onComplete: () => {
                    TweenMax.delayedCall(2, () => {
                        TweenMax.set('.transtionView', {webkitClipPath:'circle(80%)',force3D: true,})
                        TweenMax.delayedCall(2, () => {
                            TweenMax.fromTo (('#'+ Ids.VIEWS.RACE) , 1, {opacity:1}, {opacity:0,display:'none'});
                            TweenMax.delayedCall(1, () => {
                                TweenMax.set('.transtionView', {webkitClipPath:'circle(0%)',force3D: true,})
                                TweenMax.fromTo (('#'+ Ids.VIEWS.INFOS) , 1, {opacity:0}, {opacity:1,display:'block'});
                            })
                        });
                    })
                }
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

    onStartViewClick () {
        ViewHandler.show(Ids.VIEWS.RACE);
        this.transition.play();
        this.onViewAppear();
    }

    onCountDownFinish () {
        this.onStart();
        this.start();
    }

    onCountDownStart () {
        this.CountDown.start(this.onCountDownFinish.bind(this));
    }

}