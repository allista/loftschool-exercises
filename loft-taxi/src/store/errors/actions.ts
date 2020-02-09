import { _A } from 'store/common';
import { ErrorItem, ErrorKey } from './types';
import { Messages } from './messages';
import { Action } from 'store/types';

export enum ErrorActionType {
  ERROR = 'ERROR',
  REMOVE_ERROR = 'REMOVE_ERROR',
  CLEAR_ERRORS = 'CLEAR_ERRORS',
}

export type AddErrorAction = Action<ErrorActionType.ERROR, ErrorItem>;
export type RemoveErrorAction = Action<ErrorActionType.REMOVE_ERROR, ErrorKey>;
export type ClearErrorsAction = Action<ErrorActionType.CLEAR_ERRORS, null>;

export type ErrorAction = AddErrorAction | ClearErrorsAction | RemoveErrorAction;

export const addError = ({ message, content = undefined }: ErrorItem): AddErrorAction =>
  _A(ErrorActionType.ERROR, { message, content });

export const addException = (error: any): AddErrorAction => {
  const { name, message } = error;
  if (name)
    return _A(ErrorActionType.ERROR, {
      message: name,
      content: message ? [message] : [],
      error,
    } as ErrorItem);
  return _A(ErrorActionType.ERROR, {
    message: error.toString(),
  } as ErrorItem);
};

export const removeError = (key: ErrorKey): RemoveErrorAction =>
  _A(ErrorActionType.REMOVE_ERROR, key);

export const clearErrors = (): ClearErrorsAction => _A(ErrorActionType.CLEAR_ERRORS, null);

export const handleError = async (error: any): Promise<AddErrorAction> => {
  console.dir(error);
  const { response } = error;
  if (!response || !response.data) {
    return addException(error);
  }
  if (response.data instanceof Blob) {
    let rawText: string;
    try {
      rawText = await new Response(response.data).text();
    } catch (error) {
      return addException(error);
    }
    try {
      const serverError = JSON.parse(rawText).error;
      if (serverError) {
        return addError(serverError);
      }
    } catch (error) {
      // do nothing here, as this not a json error
      // and should be treated like standard HTTP status+message
      // below
    }
  } else if (response.data.error) {
    return addError({
      message: Messages.SERVER_ERROR,
      content: [response.data.error],
    });
  }
  return addError({
    message: Messages.SERVER_ERROR,
    content: [`[${response.status}] ${response.statusText}`],
  });
};
