import {Ids} from "../../../datas/dom";
export class RaceEnd {

    constructor () {
        this.scoreUserEl = document.getElementById(Ids.END.SCORE_USER);
        this.scoresEl = document.getElementById(Ids.END.SCORES);
        this.textEl = document.getElementById(Ids.END.TEXT_SCORE);
    }

    build (scores, scoreUser, text) {
        this.textEl.innerHTML = text;
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