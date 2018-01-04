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
        this.Bus.listen(this.Bus.types.ON_USER_MOVE_RECEIVED, (function () {
            this.incrementPosition();
            this.Bus.dispatch(this.Bus.types.ON_USER_MOVE);
        }).bind(this));
    }

}