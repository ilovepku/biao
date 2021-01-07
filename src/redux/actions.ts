import {
  UpdateOrientationPayload,
  UpdateModalPositionPayload,
  UpdateModalTabIndexObjPayload,
  ActionTypes,
  UPDATE_ORIENTATION,
  TOGGLE_DARK_MODE,
  UPDATE_MODAL_POSITION,
  UPDATE_MODAL_TAB_INDEX_OBJ,
} from './types'

export const updateOrientation = (
  payload: UpdateOrientationPayload,
): ActionTypes => ({
  type: UPDATE_ORIENTATION,
  payload,
})

export const toggleDarkMode = (): ActionTypes => ({
  type: TOGGLE_DARK_MODE,
})

export const updateModalPosition = (
  payload: UpdateModalPositionPayload,
): ActionTypes => ({
  type: UPDATE_MODAL_POSITION,
  payload,
})

export const updateModalTabIndexObj = (
  payload: UpdateModalTabIndexObjPayload,
): ActionTypes => ({
  type: UPDATE_MODAL_TAB_INDEX_OBJ,
  payload,
})
