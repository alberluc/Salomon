import { TweenMax } from 'gsap';
import { Audios } from "../../../datas/Medias";

let audiosPlaying = {};

export class AudioHelper {

    static get list () {
        return Audios;
    }

    static getAudioContext (src) {
        return audiosPlaying[src];
    }

    static play (src, callbacks) {
        callbacks = callbacks || {};
        let AudioContext = new Audio(src);
        this.setVolume(AudioContext, 0);
        this.gotoVolume(AudioContext, 5, 1);
        AudioContext.play();
        audiosPlaying[src] = AudioContext;
        if (typeof callbacks.onFinish !== "undefined") audiosPlaying[src].addEventListener('ended', callbacks.onFinish);
    }

    static stop (src) {
        audiosPlaying[src].stop();
    }

    static setVolume (AudioContext, volume) {
        TweenMax.set(AudioContext, { volume });
    }

    static gotoVolume (AudioContext, duration, volume) {
        TweenMax.to(AudioContext, duration, { volume });
    }

}