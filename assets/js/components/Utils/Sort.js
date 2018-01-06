export class Sort {

    static exists (objects, exam) {
        let exists = [];
        objects.forEach(object => {
            try {
                exists.push(eval("object." + exam));
            }
            catch (err) {}
        });
        return exists;
    }

    static asc (objects, exam) {
        let sortable = this.exists(objects, exam);
        return sortable.sort((a, b) => a - b).map(sorted => objects.filter(object => {
            try {
                return eval('sorted === object.' + exam);
            }
            catch (err) {}
        })[0]);
    }

    static desc (objects, exam) {
        return this.asc(objects, exam).reverse();
    }

    static getInterval (objects, exam) {
        let filtered = this.asc(objects, exam);
        return [
            filtered[0],
            filtered[filtered.length - 1]
        ];
    }

}