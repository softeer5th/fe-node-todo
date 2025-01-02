export const ERROR_MESSAGE = {
  blank: '공백은 입력할 수 없습니다. 다시 입력해주세요!',
  notFound: '해당하는 todo가 없습니다. id를 다시 입력해주세요!',
  format: '입력 양식이 맞지 않습니다. 다시 입력해주세요!',
  isFinished: '이미 완료된 todo입니다. id를 다시 확인해주세요!',
};

export const COMMAND = {
  print: 'print',
  add: 'add',
  delete: 'delete',
  finish: 'finish',
  edit: 'edit',
};

export const INFO_MESSAGE = {
  start: '[START] 명령어를 입력해주세요: add, print, delete, edit, finish',
  next: '\n명령어를 입력해주세요: add, print, delete, edit, finish',
  add: '추가할 내용을 입력해주세요:',
  delete: '삭제할 todo id를 입력해주세요:',
  finish: '완료한 todo id를 입력해주세요:',
  edit: '수정할 todo id와 수정할 내용을 공백을 두고 입력해주세요:',
  error: '잘못된 명령어입니다. 다시 입력해주세요!',
};
