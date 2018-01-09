import { TweenMax } from 'gsap';
import { Audios } from "../../../datas/Medias";
import { Bus } from "../../events/Bus";

let AudiosContextPlaying = {};

export class AudioHelper {

    static get list () {
        return Audios;
    }

    static getAudioContext (src) {
        return AudiosContextPlaying[src];
    }

    static play (src, options) {
        let AudioContext = new Audio(src);
        this.fromToVolume(AudioContext, options.volume.from, options.volume.to, options.volume.duration);
        AudioContext.play();
        AudiosContextPlaying[src] = AudioContext;
        if (typeof options.onFinish !== "undefined") this.eval(AudioContext, 'ended', options.onFinish)
    }

    static stop (src) {
        AudiosContextPlaying[src].stop();
    }

    static fromToVolume (AudioContext, from, to, duration) {
        this.setVolume(AudioContext, from);
        this.goToVolume(AudioContext, duration, to);
    }

    static setVolume (AudioContext, volume) {
        TweenMax.set(AudioContext, { volume });
    }

    static goToVolume (AudioContext, duration, volume) {
        TweenMax.to(AudioContext, duration, { volume });
    }

    static eval (AudioContext, event, callback) {
        if (typeof callback === "string") {
            AudioContext.addEventListener(event, function () {
                this.Bus = new Bus();
                this.Bus.dispatch(callback);
            });
        }
        else {
            AudioContext.addEventListener(event, callback);
        }
    }

}