import { API } from "./API";

export class API_Light extends API {

    emitChangeColor (value) {
        this.socket.emit('change_color', value);
    }

}