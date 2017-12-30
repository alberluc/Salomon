export class API {

    constructor (APIModel, socket) {
        this.APIModel = APIModel;
        this.APIMethods = this.getAPIMethods(APIModel);
        this.exceptsMethods = this.getAPIMethods(this);
        this.socket = socket;
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
        eval("this.socket.on('" + this.transformUpperToLower(method, '_') + "', this.APIModel." + method + ")");
    }

    transformUpperToLower (method, prefix, sufix) {
        return method.replace(/([A-Z])/g, find => prefix || '' + find.toLowerCase() + sufix || '');
    }

}