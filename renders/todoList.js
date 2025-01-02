

function todoList(data, selectIndex) {
    const output = [
        '\n\n-------------',
        'todo 목록',
        '단축키: w-위, s-아래, z-추가, x-완료, c-삭제, q-종료',
        '  완료 마감 날짜   할 일',
    ]
    data.forEach((line, index) => {
        const array = line
        let temp = ''

        // 현재 커서 여부
        if (selectIndex === index) {
            temp += '- '
        }
        else {
            temp += '  '
        }

        // 완료 여부
        if (array[1] === 'O') {
            temp += '[v] '
        }
        else {
            temp += '[ ] '
        }

        // 날짜
        temp += `${array[2]} `

        // 할 일
        temp += array[0]

        output.push(temp)
    })

    output.push('-------------')
    console.log(output.join('\n'))
}

module.exports = todoList