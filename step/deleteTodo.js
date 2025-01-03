async function deleteTodo(data, select){
    while(true) {
        require('../renders/deleteInterface')()
        const key = await require('../utils/keyInput')()
        if(key === "y" || key==="Y"){
            const newData = [...data.slice(0, select), ...data.slice(select + 1)]
            data = newData
            require('../utils/todoIO').fileWrite(data.map(line => line.join('-')).join('\n'))
            break
        }
        else if (key === "N" || key === "n") {
            break
        }
        else {

        }
    }
    return data
}
module.exports = deleteTodo