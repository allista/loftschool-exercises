export const passwordValidator = {
  required: 'Обязательное поле',
  minLength: { value: 6, message: 'Минимум 6 символов' },
  maxLength: { value: 32, message: 'Максимум 32 символа' },
};
