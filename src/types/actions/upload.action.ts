export const POST_PROBLEM= 'POST_PROBLEM';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const POSTPROB_VOICE = 'POSTPROB_VOICE';


export interface Setpostproblem {
  type: typeof POST_PROBLEM;
  payload: any | null;
}
export interface Uploadpicture {
  type: typeof UPLOAD_PICTURE;
  payload: any | null;
}
export interface Setpostprobvoice{
  type: typeof POSTPROB_VOICE;
  payload: any | null;
}
export type UploadActions =
  | Setpostproblem
  | Uploadpicture
  | Setpostprobvoice
  