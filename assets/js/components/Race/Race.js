import { Bus } from "../../events/Bus";
import {ClassNames, Ids} from "../../../datas/dom"
import { ViewHandler } from "../Utils/ViewHandler";
import { Sort } from "../Utils/Sort";
import { Indicator } from "./Indicator";


const STATE = {
    WAIT: "wait",
    RUN: "run",
    FINISH: "finish"
};

export class Race {

    constructor (Script, MapCourse) {
        this.Script = Script;
        this.MapCourse = MapCourse;
        this.End = new RaceEnd();
        this.Bus = new Bus();
        this.scores = [];
        this.dataArduino = [];
        this.limitArray = 2;
        this.state = STATE.WAIT;
        this.Bus.listen(this.Bus.types.ON_RUNNER_FINISHED, this.onRunnerFinish.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_DEHYDRATION, this.setStateDanger.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_OVERHYDRATION, this.setStateDanger.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_CORRECT_HYDRATION, this.onUserCorrectHydration.bind(this));
    }

    waitStart () {
        let startViewEl = document.getElementById(Ids.VIEWS.START);
        startViewEl.addEventListener('click', (function () {
            /*this.start();*/
            this.steps();
            ViewHandler.show(Ids.VIEWS.RACE);
        }).bind(this));
    }

    start () {
        this.Script.Bots.forEach(Bot => Bot.run());
        this.MapCourse.animate();
        this.state = STATE.RUN;
    }

    steps() {
        let y = 0;
        document.addEventListener('keyup', (e) => {
            let test = document.getElementById('steps');
            let testAll = document.querySelectorAll('.steps');
            // LEFT
            if(e.keyCode === 37) {
                for(let i = 0; i < testAll.length; i++) {
                    if(i === 0) {
                        console.log(`steps_${1}-left`,`steps_${testAll.length}-left`);
                        testAll[i].classList.remove(`steps_${1}-left`);
                        testAll[i].classList.add(`steps_${testAll.length}-left`);
                    }
                    if(i === 2) {

                        testAll[i].classList.remove(`steps_${i + 1}-left`);
                        testAll[i].classList.add(`steps_${i}-left`);
                    }
                    if(i === 1 || i === 3) {
                        testAll[i].classList.remove(`steps_${i + 1}-right`);
                        testAll[i].classList.add(`steps_${i}-right`);
                    }
                }
            }
            if(e.keyCode === 39) {
                for(let i = 0; i < testAll.length; i++) {
                    if(i === 0) {
                        testAll[i].classList.remove(`steps_${1}-right`);
                        testAll[i].classList.add(`steps_${testAll.length}-right`);
                    }
                    if(i === 2) {
                        testAll[i].classList.remove(`steps_${i + 1}-right`);
                        testAll[i].classList.add(`steps_${i}-right`);
                    }
                    if(i === 1 || i === 3) {
                        testAll[i].classList.remove(`steps_${i + 1}-left`);
                        testAll[i].classList.add(`steps_${i}-left`);
                    }
                }
                this.dataArduino.push('Right');
            }
            this.dataArduino.splice(-this.limitArray.length - 1, this.dataArduino.length - this.limitArray);

            if(this.dataArduino[0] === "Right" && this.dataArduino[1] === "Left") {
            }
        });

    }
    finish () {
        let scoreUser = this.scores.length;
        this.completeScore();
        this.End.build(this.scores, scoreUser);
        ViewHandler.show(Ids.VIEWS.END)
    }
    completeScore () {
        let botScores = Sort.asc(this.Script.Bots, 'speed');
        for (let i = 0; i < this.Script.Bots.length + 1; i++) {
            if (typeof this.scores[i] === "undefined") {
                this.scores[i] = botScores[i - 1]
            }
        }
    }

    onRunnerFinish (e) {
        if (this.state === STATE.RUN) {
            let Runner = e.detail.Runner;
            this.scores.push(Runner);
            if (Runner.name === this.Script.User.name) {
                this.finish();
                this.state = STATE.FINISH;
            }
        }
    }

    setStateDanger () {
        document.body.classList.add(ClassNames.BODY_STATE_DANGER)
    }

    onUserCorrectHydration () {
        document.body.classList.remove(ClassNames.BODY_STATE_DANGER)
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