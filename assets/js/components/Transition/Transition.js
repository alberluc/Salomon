import { Events } from "../../../js/events/Events";
import { Bus } from "../../events/Bus";
import { TweenMax } from "gsap";

export class Transition {

    constructor() {
        this.Bus = new Bus();
        this.animation = null;
    }

    init () {
        this.Bus.listen(this.Bus.types.ON_PRESENTATION_MAP_COURSE, this.onViewMapCourse.bind(this));
        this.Bus.listen(this.Bus.types.ON_PRESENTATION_MAP_RELIEF, this.onViewMapRelief.bind(this));
        this.Bus.listen(this.Bus.types.ON_PRESENTATION_GAUGE, this.onViewGauge.bind(this));
        this.Bus.listen(this.Bus.types.ON_PRESENTATION_FINISH, this.onViewAll.bind(this));
    }

    onViewMapCourse() {
        this.animation = setTimeout(() => {
            this.transition('.opacityView', 'moduleInfo-right')
        }, 3000)
    }

    onViewMapRelief() {
        this.transition('.opacityView', 'mapRelief')
    }

    onViewGauge() {
        this.transition('.opacityView', 'moduleInfo-left')
    }

    onViewAll() {
        clearInterval(this.animation);
        let elementOpactiy = document.querySelectorAll('.opacityView');
        elementOpactiy.forEach(item => {
            TweenMax.to(item, 1, {
                autoAlpha: 1,
            })
        });
    }

    transition(elements, target) {
        let elementOpactiy = document.querySelectorAll(elements);
        elementOpactiy.forEach(item => {
            if(item.classList.contains(target)) {
                TweenMax.to(item, 1, {
                    autoAlpha: 1,
                })
            } else {
                TweenMax.to(item, 1, {
                    autoAlpha: 0.3,
                })
            }
        });
    }

}