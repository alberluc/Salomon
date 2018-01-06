import { StringHelper } from "../components/Utils/StringHelper";
import { Bus } from "./../events/Bus";


export class API {

    constructor (socket) {
        this.APIMethods = this.getAPIMethods(this);
        this.exceptsMethods = ['constructor'];
        this.socket = socket;
        this.Bus = new Bus();
    }

    getAPIMethods (APIModel) {
        return Object.getOwnPropertyNames(Object.getPrototypeOf(APIModel)).filter(property => typeof APIModel[property] === 'function');
    }

    build () {
        this.APIMethods.map(APIMethod => {
            if (!this.exceptsMethods.includes(APIMethod)) {
                let firstCapitalIndex = StringHelper.findIndexFirstCapital(APIMethod);
                let state = {
                    action: StringHelper.transformUpperToLower(APIMethod.slice(0, firstCapitalIndex)),
                    eventName: StringHelper.transformUpperToLower(APIMethod.slice(firstCapitalIndex, APIMethod.length), '_'),
                    eventMethod: APIMethod
                };
                if (state.action === 'on') {
                    this.listen(state);
                }
            }
        });
    }

    listen (state) {
        console.log("this.socket." + state.action + "('" + state.eventName + "', this." + state.eventMethod + ")");
        eval("this.socket." + state.action + "('" + state.eventName + "', this." + state.eventMethod + ")");
    }

}