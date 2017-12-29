export class API {

    constructor (APIModel, socket) {
        this.APIModel = APIModel;
        this.APIMethods = this.getAPIMethods(APIModel);
        this.exceptsMethods = this.getAPIMethods(this);
        this.socket = {
            on: function (type, callbak) {
                console.log(type, callbak)
            }
        };
    }

    getAPIMethods (APIModel) {
        return Object.getOwnPropertyNames(Object.getPrototypeOf(APIModel)).filter(property => typeof APIModel[property] === 'function');
    }

    build () {
        this.APIMethods.map(APIMethod => {
            if (!this.exceptsMethods.includes(APIMethod))
                this.listen(APIMethod);
        });
    }

    listen (method) {
        eval("this.socket.on('" + this.transform(method) + "', this.APIModel." + method + ")");
    }

    transform (method) {
        return method.replace(/([A-Z])/g, find => "_" + find.toLowerCase());
    }

}