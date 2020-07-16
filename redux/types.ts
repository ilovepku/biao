export const UPDATE_ORIENTATION = "UPDATE_ORIENTATION";
export const UPDATE_MODAL_POSITION = "UPDATE_MODAL_POSITION";
export const UPDATE_MODAL_TAB_INDEX_OBJ = "UPDATE_MODAL_TAB_INDEX";

export type UpdateOrientationPayload = "portrait" | "landscape";
export type UpdateModalPositionPayload = "closed" | "initial" | "top";
export type UpdateModalTabIndexObjPayload = { index: number };

interface UpdateOrientationAction {
  type: typeof UPDATE_ORIENTATION;
  payload: UpdateOrientationPayload;
}

interface UpdateModalPositionAction {
  type: typeof UPDATE_MODAL_POSITION;
  payload: UpdateModalPositionPayload;
}

interface UpdateModalTabIndexAction {
  type: typeof UPDATE_MODAL_TAB_INDEX_OBJ;
  payload: UpdateModalTabIndexObjPayload;
}

export type ActionTypes =
  | UpdateOrientationAction
  | UpdateModalPositionAction
  | UpdateModalTabIndexAction;
