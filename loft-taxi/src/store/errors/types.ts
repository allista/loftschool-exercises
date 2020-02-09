export interface ErrorItem {
  message: string;
  content?: string[];
  error?: any; // original error object
}

export type Errors = {
  [key: string]: ErrorItem;
};

export type ErrorKey = keyof Errors;
