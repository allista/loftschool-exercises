// eslint-disable-next-line no-control-regex
// from: https://www.regular-expressions.info/email.html
export const emailRe = /^(?=[a-z0-9@.!#$%&'*+/=?^_‘{|}~-]{6,254}$)(?=[a-z0-9.!#$%&'*+/=?^_‘{|}~-]{1,64}@)[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:(?=[a-z0-9-]{1,63}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{1,63}$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const emailValidator = {
  required: 'Обязательное поле',
  pattern: {
    value: emailRe,
    message: 'Не соответствует формату e-mail',
  },
};
