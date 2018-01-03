import { Ids } from './../../../datas/dom'

let ids = Ids;
let ViewsEl = Object.keys(Ids.VIEWS).map(name => document.getElementById(eval('ids.VIEWS.' + name)));

export class ViewHandler {

    static show (view) {
        ViewsEl.forEach(viewEl => {
            if (viewEl.getAttribute('id') === view) {
                viewEl.classList.add('view-active');
            }
            else {
                viewEl.classList.remove('view-active');
            }
        })
    }

}