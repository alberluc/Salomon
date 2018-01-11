export class nextView {
    constructor(el, time) {
        this.el = el;
        this.initTimer(time)

    }

    initTimer(time) {

        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
        })();

        window.cancelRequestAnimFrame = (function(){
            return  window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame ||
            clearTimeout
        })();

        let lastTime = (new Date()).getTime();
        let numSeconds = 0;
        (function timer() {

            requestAnimFrame(timer);
            let currentTime = (new Date()).getTime();

            if (currentTime - lastTime >= 1000) {
                lastTime = currentTime;
                numSeconds++;
                console.log(numSeconds);
                if(time === numSeconds) {
                    console.log('Bon');
                    cancelRequestAnimFrame(timer)
                }
            }
        }());
    }

}