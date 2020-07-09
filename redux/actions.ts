import {
  UPDATE_ORIENTATION,
  UPDATE_MODAL_POSITION,
  UpdateOrientationPayload,
  UpdateModalPositionPayload,
  ActionTypes,
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
