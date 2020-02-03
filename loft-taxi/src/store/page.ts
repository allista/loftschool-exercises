import { Action } from './types';
import { PageID } from 'shared';
import { _A, simpleReducer } from './common';

export const SET_PAGE = 'SET_PAGE';
export type PageAction = Action<typeof SET_PAGE, PageID>;

export const setPage = (pageID: PageID): PageAction => _A(SET_PAGE, pageID);

export const pageReducer = simpleReducer<PageAction>(SET_PAGE, PageID.LOGIN);
