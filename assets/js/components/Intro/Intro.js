import { Ids } from "../../../datas/dom"
import { ViewHandler } from "../Utils/ViewHandler";
import { TranstionView } from "../Utils/TranstionView";
import { Sound } from "../Sound/Sound";
import { Race as RaceModel } from "../Race/Race";
import { Bus } from "../../events/Bus";

export class Intro {

    constructor () {
        this.timeToPlay();
        this.one = true;
    }

    timeToPlay () {
        console.log(document.getElementById('stroke_headphone').getTotalLength());
        let startTimeToPlay = document.getElementById(Ids.INIT.PLAY);
        startTimeToPlay.addEventListener('click', () => {
            this.intruction();
            TranstionView.show(Ids.INIT.SITE, Ids.INIT.PLAY);
        });
    }

    intruction () {
        this.Bus = new Bus();
        this.Bus.listen(this.Bus.types.ON_USER_STEPS, (function (event) {
            console.log(event.detail.value);
        }).bind(this));

        /*this.sound = new Sound(1);
        this.sound.play();*/
        let playRace = document.getElementById(Ids.INIT.SITE);
        playRace.addEventListener('click', () => {
            ViewHandler.show(Ids.VIEWS.START);
        });
        document.addEventListener('keyup', (e) => {
            if(e.keyCode === 37) {
                document.getElementById(Ids.INIT.FOOTLEFT).classList.add('foot--active');
            }
            if(e.keyCode === 39) {
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