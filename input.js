import readlinePromises from 'node:readline/promises';

const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const Input = {
    async readMenu() {
        const res = await rl.question(`What's your Menu?\n`);
        return res;
    },

    async InsertTodo() {
        const title = await rl.question('Title : ');
        const contents = await rl.question('Contents : ');
        return {title, contents};
    },

    async showTodo() {
        const id = await rl.question('Id : ');
        return id;
    },

    async editTodo({title, contents}) {
        const newTitle = await rl.question(`Title : ${title}`);
        const newContents = await rl.question(`Contents : ${contents}`);

        return {newTitle, newContents};
    } 
}



export default Input;