import { Bus } from "../../events/Bus";
import {ClassNames, Ids} from "../../../datas/dom"
import { ViewHandler } from "../Utils/ViewHandler";
import { Sort } from "../Utils/Sort";

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
        this.state = STATE.WAIT;
        this.Bus.listen(this.Bus.types.ON_RUNNER_FINISHED, this.onRunnerFinish.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_DEHYDRATION, this.setStateDanger.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_OVERHYDRATION, this.setStateDanger.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_CORRECT_HYDRATION, this.onUserCorrectHydration.bind(this));
    }

    waitStart () {
        let startViewEl = document.getElementById(Ids.VIEWS.START);
        startViewEl.addEventListener('click', (function () {
            this.start();
            ViewHandler.show(Ids.VIEWS.RACE);
        }).bind(this));
    }

    start () {
        this.Script.Bots.forEach(Bot => Bot.run());
        this.MapCourse.animate();
        this.state = STATE.RUN;
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