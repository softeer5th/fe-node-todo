export class ToDo {
    constructor(id, title, content, checked = false, createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.checked = checked;
        this.createdAt = createdAt ? createdAt : this.generateToKST();
    }

    generateToKST() {
        const date = new Date();
        const offset = 9 * 60 * 60 * 1000;
        const currentDate = new Date(date.getTime() + offset);

        return currentDate.toISOString().split('T')[0];
    }
}