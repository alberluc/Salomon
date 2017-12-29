import { Events } from "./Events";

let instance = null;

export class Bus {

    constructor () {
        if(!instance){
            this.types = Events;
            this.el = document.createElement('div');
            instance = this;
        }
        return instance;
    }

    listen (type, callback) {
        this.el.addEventListener(type, callback);
    }

    dispatch (type, params) {
        let e = new CustomEvent(type, {
            detail: params
        });
        this.el.dispatchEvent(e);
    }

}