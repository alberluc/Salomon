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
        if (typeof options.timeout !== "undefined") {
            setTimeout(this.startPlay.bind(this, src, options), options.timeout);
        }
        else {
            this.startPlay(src, options);
        }
    }

    static startPlay (src, options) {
        let AudioContext = new Audio(src);
        this.fromToVolume(AudioContext, options.volume.from, options.volume.to, options.volume.duration);
        AudioContext.play();
        AudiosContextPlaying[src] = AudioContext;
        if (typeof options.onStart !== "undefined") this.eval(AudioContext, false, options.onStart);
        if (typeof options.onFinish !== "undefined") this.eval(AudioContext, 'ended', options.onFinish);
        this.eval(AudioContext, 'ended', this.removeAudioContext.bind(this, src));
    }

    static removeAudioContext (src) {
        delete AudiosContextPlaying[src];
    }

    static stop (src, options) {
        if (typeof options.onStop !== "undefined") this.eval(AudiosContextPlaying[src], false, options.onStop);
        AudiosContextPlaying[src].pause();
        this.removeAudioContext(src);
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
            this.Bus = new Bus();
            if (!event) {
                this.Bus.dispatch(callback);
            }
            else {
                AudioContext.addEventListener(event, (function () {
                    this.Bus.dispatch(callback);
                }).bind(this));
            }
        }
        else {
            if (!event) {
                callback();
            }
            else {
                AudioContext.addEventListener(event, callback);
            }
        }
    }

}