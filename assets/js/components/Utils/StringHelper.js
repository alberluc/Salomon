let capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class StringHelper {

    static findIndexFirstCapital (string) {
        for (let i = 0; i <  string.length; i++) { if (capitals.indexOf(string[i]) > 0) { return i; } }
    }

    static transformUpperToLower (method, prefix, sufix) {
        return method.replace(/([A-Z])/g, find => (prefix || '' + find.toLowerCase() + sufix || ''));
    }

}