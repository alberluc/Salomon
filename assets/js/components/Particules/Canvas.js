import { Balls } from './Particules';

export class Canvas {
    constructor(el) {
        this.el = el;
        this.canvas = document.getElementById(this.el);
        this.c = this.canvas.getContext('2d');
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        this.balls = [];
        this.y = 0;
        this.dx = 0;
        this.dy = 40;
        this.cpt = 0;
        this.angle = 0;
        this.velo = 0;
        this.c.translate(-40,0);
    }
    build(number) {
        for (let i = 0; i < number; i++) {

            this.dx += (this.w / 25);
            this.cpt += 1;
            if(this.cpt < 29) {
                this.balls.push(new Balls(this.dx,this.dy,'','',this.c,this.balls));
            }
            if(this.cpt > 29) {
                this.cpt = 0;
                this.dy += (this.h / 15);
                this.dx = 0;
            }
        }

    }
}