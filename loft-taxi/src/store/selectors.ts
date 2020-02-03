import { AppState } from 'store/types';

export const getPageID = (state: AppState) => state.pageID;
export const getErrors = (state: AppState) => state.errors;
