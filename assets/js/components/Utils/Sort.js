export class Sort {

    static asc (objects, exam) {
        let sortable = [];
        objects.forEach(object => sortable.push(eval("object." + exam)));
        return sortable.sort((a, b) => a - b);
    }

    static desc (objects, exam) {
        return this.asc(objects, exam).reverse();
    }

    static getInterval (objects, exam) {
        let filtered = this.asc(objects, exam).map(sorted => objects.filter(object => eval('sorted === object.' + exam)));
        return [
            filtered[0],
            filtered[objects.length - 1]
        ];
    }

}