import {
  ActionTypes,
  UPDATE_ORIENTATION,
  UPDATE_MODAL_POSITION,
} from "./types";

const initState = {
  orientation: "portrait",
  modalPosition: "closed",
};

export default function reducer(state = initState, action: ActionTypes) {
  switch (action.type) {
    case UPDATE_ORIENTATION:
      return { ...state, orientation: action.payload };
    case UPDATE_MODAL_POSITION:
      return { ...state, modalPosition: action.payload };
    default:
      return state;
  }
}
