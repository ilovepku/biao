import {
  ActionTypes,
  UPDATE_ORIENTATION,
  UPDATE_MODAL_POSITION,
  UPDATE_MODAL_TAB_INDEX_OBJ,
} from "./types";

const initState = {
  orientation: "portrait",
  modalPosition: "closed",
  modalTabIndexObj: { index: 0 },
};

export default function reducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    case UPDATE_ORIENTATION:
      return { ...state, orientation: action.payload };
    case UPDATE_MODAL_POSITION:
      return { ...state, modalPosition: action.payload };
    case UPDATE_MODAL_TAB_INDEX_OBJ:
      return { ...state, modalTabIndexObj: action.payload };
    default:
      return state;
  }
}
