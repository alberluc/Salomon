import { API } from "./API";

export class API_Movement extends API {

    onMovementReceived () {
        this.Bus.dispatch(this.Bus.types.ON_USER_MOVE_RECEIVED);
    }

}