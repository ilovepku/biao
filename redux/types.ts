export const UPDATE_ORIENTATION = "UPDATE_ORIENTATION";
export const UPDATE_MODAL_POSITION = "UPDATE_MODAL_POSITION";

export type UpdateOrientationPayload = number;
export type UpdateModalPositionPayload = string;

interface UpdateOrientationAction {
  type: typeof UPDATE_ORIENTATION;
  payload: UpdateOrientationPayload;
}

interface UpdateModalPositionAction {
  type: typeof UPDATE_MODAL_POSITION;
  payload: UpdateModalPositionPayload;
}

export type ActionTypes = UpdateOrientationAction | UpdateModalPositionAction;
