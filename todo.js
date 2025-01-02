class Todo {
    #title;
    #contents;
    #id; 
    constructor(title, contents, id) {
        this.#title = title;
        this.#contents = contents;
        this.#id = id;
    }
}

export default Todo;