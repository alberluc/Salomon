import { Ids } from "../../../datas/dom"
import { ViewHandler } from "../Utils/ViewHandler";
import { Race as RaceModel } from "../Race/Race";
import { Bus } from "../../events/Bus";
import { TweenMax } from 'gsap';




export class Intro {

    constructor () {
        this.timeToPlay();
        this.one = true;
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
        this.Bus.listen(this.Bus.types.ON_USER_STEPS, (function (event) {
            console.log(event.detail.value);
        }).bind(this));
        let playRace = document.getElementById(Ids.INIT.SITE);
        playRace.addEventListener('click', () => {
            ViewHandler.show(Ids.VIEWS.START);
        });
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 37) {
                document.getElementById(Ids.INIT.FOOTLEFT).classList.add('foot--active');
            }
            if (e.keyCode === 39) {
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