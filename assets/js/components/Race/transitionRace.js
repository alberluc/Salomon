import { TweenMax, TimelineLite } from 'gsap';
import { Ids} from "../../../datas/dom"

export class transitionRace {

    constructor() {
        this.tl = new TimelineLite({ paused: true });
        this.transitionGauge();
        this.transitionSpeed();
        this.transitionSteps();
        this.transitionMap();
        //this.transitionMapRelief();
        this.transitionDevinele();
    }

    transitionMapRelief() {
        let map = document.getElementById(Ids.TRANSITION.MAP_RELIEF);
        this.tl.fromTo(map, 0.5, { autoAlpha: 0,}, {
            autoAlpha: 1,
            force3D: true,
        })
    }

    transitionMap() {
        this.tl.fromTo('#' + Ids.TRANSITION.MODULEINFO_RIGHT, 0.5, { autoAlpha: 0,}, {
            autoAlpha: 1,
            force3D: true,
        })
    }

    transitionSteps() {
        this.tl.fromTo('.steps-opacity', 0.5, { opacity: 0,}, {
            opacity: 1,
        })
    }

    transitionGauge() {
        this.tl.fromTo('#' + Ids.TRANSITION.MODULEINFO_LEFT, 0.5, { autoAlpha: 0,}, {
            autoAlpha: 1,
            force3D: true,
            onComplete: () => {
                TweenMax.staggerTo('.gauge_level', 1, {
                    delay: Math.random() * 1,
                    scaleX: 1,
                    force3D: true,
                }, '-=0.6');
                TweenMax.to('.gauge_bar_level', 1,{
                    delay: 1,
                    autoAlpha: 1,
                    force3D: true,
                });
            }
        })
    }

    transitionSpeed() {
        this.tl.fromTo('#' + Ids.TRANSITION.SPEED, 0.5, { autoAlpha: 0,}, {
            onStart: () => {
                TweenMax.set('#' + Ids.TRANSITION.SPEED, {
                    className: 'race-top_speed opacityView active',
                })
            },
            autoAlpha: 1,
            force3D: true,
        })
    }

    transitionDevinele() {
        this.tl.fromTo('#' + Ids.TRANSITION.DENIVELE, 0.5, { autoAlpha: 0,}, {
            onStart: () => {
                TweenMax.set('#' + Ids.TRANSITION.DENIVELE, {
                    className: 'race-top_speed opacityView active',
                })
            },
            autoAlpha: 1,
            force3D: true,

        })
    }

    play() {
        this.tl.play();
    }

}


