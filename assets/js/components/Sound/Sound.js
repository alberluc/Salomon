import {TweenMax} from 'gsap';

export class Sound {
    constructor(id) {
        this.id = id;
        this.play(this.id);
    }

    play(id) {
        let audio = new Audio(`../sound/${id}.mp3`);
        TweenMax.set(audio, {volume:0});
        TweenMax.to(audio, 5, {
            volume: 1,
        })
        audio.play();
    }


}