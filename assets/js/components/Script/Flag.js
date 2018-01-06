import { Bus } from "../../events/Bus";

export class Flag {

    constructor (flag) {
        this.key = flag.key;
        this.type = flag.type;
        this.Bus = new Bus();
    }

    dispatch () {
        this.Bus.dispatch(this.type);
    }

}