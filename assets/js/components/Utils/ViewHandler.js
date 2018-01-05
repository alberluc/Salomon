import {TweenMax} from 'gsap';
import { Ids } from './../../../datas/dom'

let ids = Ids;
let ViewsEl = Object.keys(Ids.VIEWS).map(name => document.getElementById(eval('ids.VIEWS.' + name)));

export class ViewHandler {

    static show (view) {
        ViewsEl.forEach(viewEl => {
            if (viewEl.getAttribute('id') === view) {
                viewEl.classList.add('view-active');
                /*TweenMax.fromTo((viewEl), 1, {opacity: 0}, {opacity: 1, display: 'block'})*/
            }
            else {
                /*TweenMax.fromTo((viewEl), 1, {opacity: 1}, {opacity: 0, display: 'none'})*/
                viewEl.classList.remove('view-active');
            }
        })
    }

}