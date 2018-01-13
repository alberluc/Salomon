import {Bus} from "../../events/Bus";
import {Flag} from "./Flag";

export class Navigation {

    constructor (views) {
        this.Bus = new Bus();
        this.viewsNavigation = this.getViewsNavigation(views);
    }

    getViewsNavigation (views) {
        let viewsArray = {};
        views.forEach(view => viewsArray[view.id] = this.getViewNavigation(view));
        return viewsArray;
    }

    getViewNavigation(view) {
        return {
            appear: () => {
                console.log(this);
                if (typeof view.appear !== "undefined") {
                    let flag = new Flag(view.appear.flag);
                    flag.dispatch();
                }
            },
            disappear: () => {
                if (typeof view.disappear !== "undefined") {
                    let flag = new Flag(view.disappear.flag);
                    flag.dispatch();
                }
            }
        }
    }

    init () {
        this.Bus.listen(this.Bus.types.ON_VIEW_APPEAR, this.onViewAppear.bind(this));
        this.Bus.listen(this.Bus.types.ON_VIEW_DISAPPEAR, this.onViewDisappear.bind(this));
    }

    onViewAppear (view) {
        if (typeof this.viewsNavigation[view.id] !== "undefined") this.viewsNavigation[view.id].appear();
    }

    onViewDisappear (view) {
        if (typeof this.viewsNavigation[view.id] !== "undefined") this.viewsNavigation[view.id].disappear();
    }
}