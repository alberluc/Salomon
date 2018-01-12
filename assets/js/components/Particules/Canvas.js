import { Bus } from "../../events/Bus";


export function Canvas(el) {

    let canvas = document.getElementById(el);
    let c = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    let balls = [];
    let y = 0;
    let dx = 0;
    let dy = 40;
    let cpt = 0;

    class Balls {
        constructor(x,y,radius, color) {
            this.x = x || 0;
            this.y = y || 0;
            this.vx = 0;
            this.vy = 0;
            this.radius = radius || 3;
            this.color = color || 'rgba(255,255,255,0.5)';
        }
        draw(c) {
            c.beginPath();
            c.arc(this.x,this.y,this.radius,0,2*Math.PI);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        }
        setPos(a) {
            this.x += Math.cos(Math.PI * a * 10) * 0.5;
            this.y += Math.sin(a * 10) * 0.06;
        }
    }

    for (let i = 0; i < 481; i++) {

        dx += (w / 25);
        cpt += 1;

        if(cpt < 29) {
            balls.push(new Balls(dx,dy));
        }
        if(cpt > 29) {
            cpt = 0;
            dy += (h / 14);
            dx = 0;
        }
    }

    let angle = 0;
    let velo = 0;


    function Render() {
        window.requestAnimationFrame(Render);
        c.clearRect(0,0,w,h);
        balls.forEach(ball => {
            let a = angle + velo;
            velo +=  0.1;
            ball.draw(c);
            ball.setPos(a);

        });
        angle += 5 / Math.PI;

    }
    Render();

    window.addEventListener('resize', () => {
        w = window.innerWidth,
            h = window.innerHeight;
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;

    })
}