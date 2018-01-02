import { Runner } from "./Runner";

export class User extends Runner {

    /**
     * Constructeur Runners
     * @param Script
     * @param UnitBuilder
     * @param position
     */
    constructor (Script, position) {
        super(Script, position);
        this.Bus.listen(this.Bus.types.ON_USER_MOVE_RECEIVED, this.incrementPosition.bind(this));
    }

}