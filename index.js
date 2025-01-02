const createTodo = require("./step/createTodo");
const deleteTodo = require("./step/deleteTodo");
require('./renders/loadInterface')()
let data = require('./utils/todoIO').fileRead()

async function run() {
    let select = 0
    while(true) {
        require('./renders/todoList')(data, select);
        const key = await require('./utils/keyInput')()
        switch(key) {
            // 위
            case 'w': {
                select = select > 0 ? select - 1 : select;
                break
            }
            // 아래
            case 's': {
                select = select < (data.length - 1) ? select + 1 : select;
                break
            }
            // 추가
            case 'z': {
                await createTodo(data)
                break
            }
            // 완료
            case 'x': {
                if (data[select][1] === 'O') {
                    data[select][1] = 'X'
                }
                else {
                    data[select][1] = 'O'
                }
                require('./utils/todoIO').fileWrite(data.map(line => line.join('-')).join('\n'))
                break
            }
            // 삭제
            case 'c': {
                if (data.length === 0) break
                data = await deleteTodo(data, select)
                break
            }
            case 'q': {
                return;
            }
            // // 수정
            // case 'v': {
            //
            //     break
            // }
        }
        console.log(key.charCodeAt(0))
    }
}

run()