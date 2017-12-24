export class Sort {

    static asc (objects, exam) {
        let sortable = [];
        objects.forEach(object => sortable.push(eval("object." + exam)));
        return sortable.sort((a, b) => a - b);
    }

    static desc (objects, exam) {
        return this.asc(objects, exam).reverse();
    }

}