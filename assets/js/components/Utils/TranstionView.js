import {TweenMax} from 'gsap';
import { Ids } from './../../../datas/dom';

let ids = Ids;

export class TranstionView {

    static show (view, hide) {
        TweenMax.fromTo (("#" + hide) , 1, {opacity:1}, {
            onComplete: () => {
                document.getElementById(hide).classList.remove('view-active');
            },
            //opacity:0,
            display:'none',
        });
        TweenMax.delayedCall(1,() => {
            TweenMax.fromTo (("#" + view) , 1, {opacity:0}, {
                onComplete: () => {
                    document.getElementById(view).classList.add('view-active');
                },
                //opacity:1,
                display:'block',
            })
        });
    }

}