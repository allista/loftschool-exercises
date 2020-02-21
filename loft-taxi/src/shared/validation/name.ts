export const nameValidator = {
  required: 'Обязательное поле',
  pattern: {
    value: /^[a-zа-я]+([- ][a-zа-я]+)*$/i,
    message: 'Только буквы, пробел и дефис',
  },
};
