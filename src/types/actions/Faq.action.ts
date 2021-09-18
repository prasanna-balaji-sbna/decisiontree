export const GET_FAQ= 'GET_FAQ';
export const CREATE_FAQ= 'CREATE_FAQ';
export const UPDATE_FAQ= 'UPDATE_FAQ';

export interface SetgetFAQ {
  type: typeof GET_FAQ;
  payload: any | null;
}
export interface SetcreateFAQ {
  type: typeof CREATE_FAQ;
  payload: any | null;
}
export interface SetupdateFAQ {
  type: typeof UPDATE_FAQ;
  payload: any | null;
}


export type FAQActions =
  | SetgetFAQ
  | SetcreateFAQ
  | SetupdateFAQ
