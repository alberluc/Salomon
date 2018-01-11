import { Ids } from "../../../datas/dom"
import { ViewHandler } from "../Utils/ViewHandler";
import { Race as RaceModel } from "../Race/Race";
import { Bus } from "../../events/Bus";
import { TweenMax } from 'gsap';
import {AudioHelper as AudioPlayer, AudioHelper} from "../Utils/AudioHelper";
import { Audios } from "../../../datas/Medias";





export class Intro {

    constructor () {
        this.timeToPlay();
        this.one = true;
        this.steps = null;
    }

    timeToPlay () {
        TweenMax.from('.path',1, {
            drawSVG:"50% 50%",
        });
        let startTimeToPlay = document.getElementById(Ids.INIT.PLAY);
        startTimeToPlay.addEventListener('click', () => {
            this.intruction();
            ViewHandler.show(Ids.INIT.SITE);
        });
    }

    intruction () {
        this.Bus = new Bus();
        /*A Mettre pour la carte arduino ON_USER_MOVE*/
        this.Bus.listen(this.Bus.types.ON_USER_STEPS, (function (event) {
            this.steps = event.detail.value;
        }).bind(this));
        let playRace = document.getElementById(Ids.INIT.SITE);
        playRace.addEventListener('click', () => {
            ViewHandler.show(Ids.VIEWS.START);
        });
        document.addEventListener('keyup', (e) => {
            if(e.keyCode === 37 || this.steps === 'Left') {
                document.getElementById(Ids.INIT.FOOTLEFT).classList.add('foot--active');
            }
            if(e.keyCode === 39 || this.steps === 'Right') {
                document.getElementById(Ids.INIT.FOOTRIGHT).classList.add('foot--active');
                this.placement();
            }
        });

    }

    placement() {
        if(document.getElementById(Ids.INIT.FOOTLEFT).classList.contains('foot--active') && document.getElementById(Ids.INIT.FOOTRIGHT).classList.contains('foot--active') && this.one) {
            TweenMax.delayedCall(2,() => {
                ViewHandler.show(Ids.VIEWS.START);
            })
            this.one = false;
        }
    }
}