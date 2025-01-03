

function deleteInterface() {
    const output = [
        '\n\n-----------',
        'todo 삭제',
        '정말 삭제하시겠습니까? Y/N',
        '-----------',
    ]
    console.log(output.join('\n'))
}

module.exports = deleteInterface; // 함수 내보내기