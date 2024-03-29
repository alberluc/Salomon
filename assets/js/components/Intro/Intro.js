import { Ids } from "../../../datas/dom"
import { ViewHandler } from "../Utils/ViewHandler";
import { nextView } from "../Utils/nextView";

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
        document.addEventListener('keydown', () => {
            document.getElementById('nextViewTime').classList.add('nextView--active');
        });
        document.addEventListener('keyup', () => {
            document.getElementById('nextViewTime').classList.remove('nextView--active');
        });
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
        this.Bus.listen(this.Bus.types.ON_USER_PLACEMENT, (function (event) {
            this.steps = event.value.trim();
            if(this.steps === 'Left') {
                document.getElementById(Ids.INIT.FOOTLEFT).classList.add('foot--active');
                this.placement();

            }
            if(this.steps === 'Right') {
                document.getElementById(Ids.INIT.FOOTRIGHT).classList.add('foot--active');
                this.placement();
            }
        }).bind(this));
        let keyA = false, keyB = false, start = false;
        document.addEventListener('keyup', (e) => {
            if(e.keyCode === 37 || this.steps === 'Left') {
                keyA = true;
                document.getElementById(Ids.INIT.FOOTLEFT).classList.add('foot--active');
            }
            if(e.keyCode === 39 || this.steps === 'Right') {
                keyB = true;
                document.getElementById(Ids.INIT.FOOTRIGHT).classList.add('foot--active');
            }
            if (keyA && keyB && !start) {
                start = true;
                TweenMax.delayedCall(1, () => {
                    this.Bus.dispatch(this.Bus.types.ON_USER_GOOD_PLACEMENT);
                });
            }
        });
    }

    placement() {
        if(document.getElementById(Ids.INIT.FOOTLEFT).classList.contains('foot--active') && document.getElementById(Ids.INIT.FOOTRIGHT).classList.contains('foot--active') && this.one) {
            TweenMax.delayedCall(1, () => {
                this.Bus.dispatch(this.Bus.types.ON_USER_GOOD_PLACEMENT);
            });
            this.one = false;
        }
    }

}