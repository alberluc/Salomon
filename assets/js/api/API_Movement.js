import { API } from "./API";

export class API_Movement extends API {

    onMovementReceived () {
        this.Bus.dispatch(this.Bus.types.ON_USER_MOVE_RECEIVED);
    }

    onMovementRecept(value) {
        this.dataArduino.push(value.trim());
        this.dataArduino.splice(-this.limitArray.length - 1, this.dataArduino.length - this.limitArray);
        // Vérifcation
        if(this.dataArduino[0] === "Left" && this.dataArduino[1] === "Right" || this.dataArduino[0] === "Right" && this.dataArduino[1] === "Left") {
            this.Bus.dispatch(this.Bus.types.ON_USER_MOVE_RECEIVED, { value });
        }
    }

    onUserPlacement(value) {
        this.Bus.dispatch(this.Bus.types.ON_USER_PLACEMENT, { value });
    }

}