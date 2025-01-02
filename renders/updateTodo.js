

function updateTodo(data, index) {
    const output = [
        '\n\n-----------',
        'todo 수정',
        '단축키: z-저장, q-뒤로가기',
        `날짜: ${data[index][2]}`,
        `제목: ${data[index][0]}`,
    ]
}

function updateTodoInputError(data, index) {
    const output = [
        '\n\n-----------',
        'todo 수정 - 날짜와 제목을 입력해주세요!!',
        '단축키: z-저장, q-뒤로가기',
        `날짜: ${data[index][2]}`,
        `제목: ${data[index][0]}`,
    ]
}