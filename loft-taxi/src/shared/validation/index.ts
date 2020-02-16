import { InputState } from 'shared/Input';

export * from './email';
export * from './password';

export const inputPropsFromErrors = (errors: any, name: string) => ({
  inputState: errors[name] && InputState.ERROR,
  message: errors[name]?.message as string,
});
