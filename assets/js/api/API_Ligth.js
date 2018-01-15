import { API } from "./API";

export class API_Light extends API {

    constructor(socket) {
        super(socket);
        this.Bus.listen(this.Bus.types.ON_USER_DEHYDRATION, this.emitChangeColor.bind(this));
        this.Bus.listen(this.Bus.types.ON_USER_NORMAL, this.emitNormal.bind(this));
    }

    emitChangeColor () {
        this.socket.emit('change_color', { message: 'Salut'});
    }

    emitNormal () {
        this.socket.emit('normal_color', { message: 'Salut'});
    }

}