export class Balls {
    constructor(x,y,radius, color, context, balls) {
        this.balls = balls
        this.c = context;
        this.x = x || 0;
        this.y = y || 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius || 2;
        this.color = color || 'rgba(255,255,255,0.2)';
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.angle = 0;
        this.Render();

    }
    draw(c) {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    setPost(a) {
        this.x += Math.cos(a * 70) / 2;
        this.y += Math.sin(a * 70) / 2;
    }
    Render() {
        this.c.clearRect(0,0,this.w,this.h);
        requestAnimationFrame(this.Render);
        this.balls.forEach(ball => {
            let a = this.angle + this.velo;
            this.velo +=  0.1;
            ball.draw(this.c);
            ball.setPost(this.a);
        });
        this.angle += 0.1;
    }
}