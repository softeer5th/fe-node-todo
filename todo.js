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

    getDetail() {
        return {
            title: this.#title,
            contents: this.#contents
        }
    }

    editDetail(newTitle, newContents) {
        if(newTitle !== '') {
            this.#title = newTitle;
        }
        if(newContents !== '') {
            this.#contents = newContents;
        }
    }
}

export default Todo;