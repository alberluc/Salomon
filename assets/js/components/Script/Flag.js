import { Bus } from "../../events/Bus";
import { AudioHelper } from "../Utils/AudioHelper";

export class Flag {

    constructor (flag) {
        this.key = flag.key;
        this.type = flag.type || null;
        this.audios = flag.audios || null;
        this.Bus = new Bus();
    }

    dispatch () {
        if (this.type !== null) {
            this.Bus.dispatch(this.type);
        }
        if (this.audios !== null) {
            if (typeof this.audios.play !== "undefined") this.audios.play.forEach(audio => AudioHelper.play(audio.src, audio.options || {}));
            if (typeof this.audios.stop !== "undefined") this.audios.stop.forEach(audio => AudioHelper.stop(audio.src));
        }
    }

}