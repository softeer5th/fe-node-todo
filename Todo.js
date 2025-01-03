class Todo {
    #id;
    #content;
    #isFinished;

    constructor({id, content, isFinished}){
        this.#id = id;
        this.#content = content;
        this.#isFinished = isFinished;
    }

    get id() {
        return this.#id;
    }

    get content() {
        return this.#content;
    }

    get isFinished() {
        return this.#isFinished;
    }

    mine(){
        return {id: this.#id, content: this.#content, isFinished: this.#isFinished }
    }
}

module.exports = Todo;