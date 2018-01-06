import { API } from "./API";

export class API_Movement extends API {

    constructor(socket) {
        super(socket);
        console.log(socket);
        socket.on('_ovement_ecept', function(value) {
            console.log('Salut');
        });
    }

    onMovementReceived () {
        this.Bus.dispatch(this.Bus.types.ON_USER_MOVE_RECEIVED);
    }
    onMovementRecept(value) {
        console.log(this);
        this.Bus.dispatch(this.Bus.types.ON_USER_STEPS, { value });

    }

    onNana () {}

}