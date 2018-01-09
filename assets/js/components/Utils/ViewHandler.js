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
                viewEl.classList.add('view-active');
                this.Bus.dispatch(this.Bus.types.ON_VIEW_APPEAR, { id: viewEl.getAttribute('id') });
                /*TweenMax.fromTo((viewEl), 1, {opacity: 0}, {opacity: 1, display: 'block'})*/
            }
            else {
                /*TweenMax.fromTo((viewEl), 1, {opacity: 1}, {opacity: 0, display: 'none'})*/
                if (viewEl.classList.contains('view-active')) {
                    viewEl.classList.remove('view-active');
                    this.Bus.dispatch(this.Bus.types.ON_VIEW_DISAPPEAR, { id: viewEl.getAttribute('id') });
                }
            }
        })
    }

}