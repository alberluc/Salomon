let capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class StringHelper {

    static findIndexFirstCapital (string) {
        for (let i = 0; i <  string.length; i++) { if (capitals.indexOf(string[i]) > 0) { return i; } }
    }

    static transformUpperToLower (method, prefix, sufix) {
        prefix = prefix || '';
        sufix = sufix || '';
        let firstChar = method.substr(0, 1).replace(/([A-Z])/g, (find) => {
            return find.toLowerCase()
        });
        let rest = method.substr(1, method.length - 1).replace(/([A-Z])/g, (find) => {
            return prefix + find.toLowerCase() + sufix
        });
        return firstChar + rest;
    }

}