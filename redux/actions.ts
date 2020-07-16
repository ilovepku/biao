import {
  UpdateOrientationPayload,
  UpdateModalPositionPayload,
  UpdateModalTabIndexObjPayload,
  ActionTypes,
  UPDATE_ORIENTATION,
  UPDATE_MODAL_POSITION,
  UPDATE_MODAL_TAB_INDEX_OBJ,
} from "./types";

export function updateOrientation(
  payload: UpdateOrientationPayload
): ActionTypes {
  return {
    type: UPDATE_ORIENTATION,
    payload,
  };
}

export function updateModalPosition(
  payload: UpdateModalPositionPayload
): ActionTypes {
  return {
    type: UPDATE_MODAL_POSITION,
    payload,
  };
}

export function updateModalTabIndexObj(
  payload: UpdateModalTabIndexObjPayload
): ActionTypes {
  return {
    type: UPDATE_MODAL_TAB_INDEX_OBJ,
    payload,
  };
}
