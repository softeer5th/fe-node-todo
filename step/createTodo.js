const {createTodoInputError, createInteface, createTodoTitle} = require("../renders/createInteface");

async function createTodo(data){
    let isError = false
    let isDate = true
    let date = ''
    let title = ''
    while (true) {
        if (isError) {
            createTodoInputError(date)
            isError = false
        }
        else {
            if (isDate) {
                createInteface(date)
            }
            else {
                createTodoTitle(date)
            }
        }

        if (isDate) {
            const key = await require('../utils/keyInput')()
            // 숫자 입력
            if (!Number.isNaN(Number(key))) {
                date += key
                if (date.length === 4 || date.length === 7) {
                    date += '.'
                }

                if (date.length === 10) {
                    isDate = false
                }
                console.log("성공")
                continue
            }
            // 백스페이스
            else if(key.charCodeAt(0) === 127) {
                if (date[date.length - 1] === '.') {
                    date = date.slice(0, date.length - 2)
                }
                else {
                    date = date.slice(0, date.length - 1)
                }
                continue
            }
            // 그 외
            else {
                //console.log("잘못입력했습니다.")
            }
        }
        else {
            title = await require('../utils/lineInput').getLineInput()
            if (title === '') {
                isError = true
            }
            else {
                const newTodo = [title,'X',date]
                data.push(newTodo)
                require('../utils/todoIO').fileWrite(data.map(line => line.join('-')).join('\n'))
            }
            break
        }
    }
}

module.exports = createTodo