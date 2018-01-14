import { Bus } from "../../events/Bus";
import { AudioHelper } from "../Utils/AudioHelper";

export class Flag {

    constructor (flag) {
        this.key = flag.key || null;
        this.type = flag.type || null;
        this.audios = flag.audios || null;
        this.timeout = flag.timeout || 1;
        this.Bus = new Bus();
    }

    dispatch () {
        setTimeout((function () {
            if (this.type !== null) {
                if (Array.isArray(this.type)) {
                    this.type.forEach(type => this.Bus.dispatch(type, { keyFlag: this.key }));
                }
                else {
                    this.Bus.dispatch(this.type, { keyFlag: this.key });
                }
            }
            if (this.audios !== null) {
                if (typeof this.audios.play !== "undefined") this.audios.play.forEach(audio => AudioHelper.play(audio.src, audio.options || {}));
                if (typeof this.audios.stop !== "undefined") this.audios.stop.forEach(audio => AudioHelper.stop(audio.src, audio.options || {}));
            }
        }).bind(this), this.timeout);
    }

}