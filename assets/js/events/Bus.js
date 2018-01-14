import { Events } from "./Events";
import {Flag} from "../components/Script/Flag";

let instance = null;

export class Bus {
    constructor () {
        if (!instance) {
            this.types = Events;
            this.el = document.createElement('div');
            this.Flags = [];
            instance = this;
        }
        return instance;
    }

    listen (type, callback) {
        this.el.addEventListener(type, function (e) {
            callback(e.detail);
        });
    }

    dispatch (type, params) {
        let e = new CustomEvent(type, {
            detail: params
        });
        this.el.dispatchEvent(e);
    }

    addFlag (Flag) {
        if (Flag.key !== null) this.Flags[Flag.key] = Flag;
    }

    getFlag (key) {
        return this.Flags[key]
    }

    buildFlag (key) {
        return new Flag(this.Flags[key]);
    }

}