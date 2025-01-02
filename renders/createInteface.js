

function createInteface(date) {
    let dateForm = '????.??.??'

    let newDate = ''

    if (date.length === 10) {
        newDate = date
    }
    else {
        newDate = date + '_' + dateForm.slice(date.length + 1)
    }

    const output = [
        '\n\n-----------',
        'todo 생성',
        '단축키: z-저장',
        `날짜: ${newDate}`,
        `제목: `
    ]
    console.log(output.join('\n'))
}

function createTodoTitle(date) {
    let dateForm = '????.??.??'

    let newDate = ''

    if (date.length === 10) {
        newDate = date
    }
    else {
        newDate = date + '_' + dateForm.slice(date.length + 1)
    }

    const output = [
        '\n\n-----------',
        'todo 생성',
        '단축키: z-저장',
        `날짜: ${newDate}`,
    ]
    console.log(output.join('\n'))
}

function createTodoInputError(date) {
    let dateForm = '????.??.??'

    let newDate = ''

    if (date.length === 10) {
        newDate = date
    }
    else {
        newDate = date + '_' + dateForm.slice(date.length + 1)
    }

    const output = [
        '\n\n-----------',
        'todo 생성 - 날짜와 제목을 입력해주세요!!',
        '단축키: z-저장',
        `날짜: ${newDate}`,
        `제목: `
    ]
    console.log(output.join('\n'))
}

module.exports = {
    createInteface,
    createTodoTitle,
    createTodoInputError
}