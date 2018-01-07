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
        /* PARTIE USER this.Bus.listen(this.Bus.types.ON_USER_STEPS, (function () {*/
        this.Bus.listen(this.Bus.types.ON_USER_MOVE_RECEIVED, (function () {
            this.checkCurrentPoint();
            this.incrementPosition();
            this.Bus.dispatch(this.Bus.types.ON_USER_MOVE);
        }).bind(this));
    }
    checkCurrentPoint () {
        let PointPassed = this.Script.Points.filter(Point => Point.distance.percentage < this.position.percentage);
        PointPassed = PointPassed[PointPassed.length - 1] || this.Script.Points[0];
        if (PointPassed.id !== this.Script.currentPoint.id) this.Bus.dispatch(this.Bus.types.ON_CHANGE_CURRENT_POINT, { id: PointPassed.id });
        this.Script.currentPoint = PointPassed;
    }

}