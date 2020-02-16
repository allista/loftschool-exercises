export const cardNumberValidator = {
  required: 'Обязательное поле',
  pattern: {
    value: /^((\d{4} \d{4} \d{4} \d{4}( \d{3})?)|(\d{4} \d{6} \d{5})|(\d{4} \d{6} \d{4}))$/,
    message: 'Не соответствует формату номера карты',
  },
};

export const cardNameValidator = {
  required: 'Обязательное поле',
  pattern: {
    value: /^[a-z]+([- ][a-z]+)*$/i,
    message: 'Только заглавные латинсике буквы, пробел и дефис',
  },
};

export const expiryDateValidator = {
  required: 'Обязательное поле',
  pattern: {
    value: /^((0[1-9])|(1[12]))\/\d{2}$/,
    message: 'Формат ММ/ГГ',
  },
};

export const cvcValidator = {
  required: 'Обязательное поле',
  pattern: {
    value: /^\d{3}$/,
    message: '3 цифры на обороте карты',
  },
};
