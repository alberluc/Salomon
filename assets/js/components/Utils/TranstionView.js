import {TweenMax} from 'gsap';
import { Ids } from './../../../datas/dom';

let ids = Ids;
let ViewsEl = Object.keys(Ids.VIEWS).map(name => document.getElementById(eval('ids.VIEWS.' + name)));

export class TranstionView {

    static show (view, hide) {
        TweenMax.fromTo (("#" + hide) , 1, {opacity:1}, {opacity:0,display:'none'});
        TweenMax.delayedCall(1,() => {
            TweenMax.fromTo (("#" + view) , 1, {opacity:0}, {
                opacity:1,
                display:'block',
            })
        });
    }

}