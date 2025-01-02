export class ToDo {
    constructor(id, title, content, checked = false, createdAt = new Date()) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.checked = checked;
        this.createdAt = createdAt;
    }
}