import readlinePromises from 'node:readline/promises';
import { isInTodoMap } from './todoList.js';

const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const Input = {
    async readMenu() {
        const res = await rl.question(`What's your Menu?\n`);
        return res;
    },

    async insertTodo() {
        const title = await rl.question('Title : ');
        const contents = await rl.question('Contents : ');
        return {title, contents};
    },

    async getTodoId() {
        do {
            const id = await rl.question('Id : ');
            if (!isInTodoMap(id)) {
                console.log("ERROR: 존재하지 않는 id입니다.")
                continue;
            }
            return id;
          } while (1);
    },

    async editTodo({title, contents}) {
        const newTitle = await rl.question(`Title : ${title}`);
        const newContents = await rl.question(`Contents : ${contents}`);

        return {newTitle, newContents};
    } 
}



export default Input;