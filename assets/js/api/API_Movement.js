import { API } from "./API";

export class API_Movement extends API {

    onMovementReceived () {
        this.Bus.dispatch(this.Bus.types.ON_USER_MOVE_RECEIVED);
    }

    onMovementRecept (value) {
        this.Bus.dispatch(this.Bus.types.ON_USER_STEPS, { value });
    }

    onMovement (value) {
        console.log(value)
    }

}