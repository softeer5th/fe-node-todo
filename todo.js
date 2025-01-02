class Todo {
    #title;
    #contents;
    #id;

    constructor(title, contents, id) {
        this.#title = title;
        this.#contents = contents;
        this.#id = id;
    }

    getTodo() {
        return {
            id: this.#id,
            title: this.#title
        }
    }
}

export default Todo;