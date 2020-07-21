export const UPDATE_ORIENTATION = "UPDATE_ORIENTATION";
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";
export const UPDATE_MODAL_POSITION = "UPDATE_MODAL_POSITION";
export const UPDATE_MODAL_TAB_INDEX_OBJ = "UPDATE_MODAL_TAB_INDEX";

export type UpdateOrientationPayload = "portrait" | "landscape";
export type UpdateModalPositionPayload = "closed" | "initial" | "top";
export type UpdateModalTabIndexObjPayload = { index: number };

type UpdateOrientationAction = {
  type: typeof UPDATE_ORIENTATION;
  payload: UpdateOrientationPayload;
};

type ToggleDarkModeAction = {
  type: typeof TOGGLE_DARK_MODE;
};

type UpdateModalPositionAction = {
  type: typeof UPDATE_MODAL_POSITION;
  payload: UpdateModalPositionPayload;
};

type UpdateModalTabIndexAction = {
  type: typeof UPDATE_MODAL_TAB_INDEX_OBJ;
  payload: UpdateModalTabIndexObjPayload;
};

export type ActionTypes =
  | UpdateOrientationAction
  | ToggleDarkModeAction
  | UpdateModalPositionAction
  | UpdateModalTabIndexAction;
