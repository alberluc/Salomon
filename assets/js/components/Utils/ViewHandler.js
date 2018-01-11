import {TweenMax} from 'gsap';
import { Ids } from './../../../datas/dom'
import { Bus } from "../../events/Bus";


let ids = Ids;
let ViewsEl = Object.keys(Ids.VIEWS).map(name => document.getElementById(eval('ids.VIEWS.' + name)));

export class ViewHandler {

    static show (view) {
        this.Bus = new Bus();
        ViewsEl.forEach(viewEl => {
            if (viewEl.getAttribute('id') === view) {
                /*TweenMax.delayedCall(1, () => {
                    TweenMax.fromTo((viewEl), 1, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1,
                        onComplete: () => {
                        }
                    });

                });*/
                viewEl.classList.add('view-active');

                this.Bus.dispatch(this.Bus.types.ON_VIEW_APPEAR, { id: viewEl.getAttribute('id') });
            }
            else {
                if (viewEl.classList.contains('view-active')) {
                    /*TweenMax.fromTo((viewEl), 1, {
                            autoAlpha: 1
                        },
                        {
                            autoAlpha: 0,
                            onComplete: () => {
                            }
                        });*/
                    viewEl.classList.remove('view-active');
                    this.Bus.dispatch(this.Bus.types.ON_VIEW_DISAPPEAR, { id: viewEl.getAttribute('id') });
                }
            }
        })
    }

}