import { Runner } from "./Runner";

export class User extends Runner {

    /**
     * Constructeur Runners
     * @param user
     * @param Script
     * @param position
     */
    constructor (user, Script, position) {
        super(user, Script, position);
        this.currentStep = 'right';
        this.stepsEl = document.querySelectorAll('.steps');
        /* PARTIE USER this.Bus.listen(this.Bus.types.ON_USER_STEPS, (function () {*/
        this.Bus.listen(this.Bus.types.ON_USER_MOVE_RECEIVED, (function () {
            this.checkCurrentPoint();
            this.incrementPosition();
            this.animSteps();
            this.Bus.dispatch(this.Bus.types.ON_USER_MOVE);
        }).bind(this));
    }

    checkCurrentPoint () {
        let PointPassed = this.Script.Points.filter(Point => Point.distance.percentage < this.position.percentage);
        PointPassed = PointPassed[PointPassed.length - 1] || this.Script.Points[0];
        if (PointPassed.id !== this.Script.currentPoint.id) this.Bus.dispatch(this.Bus.types.ON_CHANGE_CURRENT_POINT, { id: PointPassed.id });
        this.Script.currentPoint = PointPassed;
    }

    changeStep (step, id, dir) {
        step.classList.remove('steps_' + id + '-' + dir);
        id++;
        if (id === this.stepsEl.length + 1) id = 1;
        step.classList.add('steps_' + id + '-' + dir);
        step.setAttribute('id', 'step_' + id);
    }

    animSteps() {
        this.anim();
        if (this.currentStep === 'right') this.currentStep = 'left';
        else if (this.currentStep === 'left') this.currentStep = 'right';
    }

    anim () {
        this.stepsEl.forEach((step) => {
            let id = step.getAttribute('id').split('_')[1];
            if (step.classList.contains('step-right')) this.changeStep(step, id, 'right');
            else this.changeStep(step, id, 'left');
        })
    }

}