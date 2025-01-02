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
        const title = await rl.question('Title : \n ');
        const contents = await rl.question('Contents : \n');
        return {title, contents};
    }
}



export default Input;