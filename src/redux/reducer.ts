import {
  ActionTypes,
  UPDATE_ORIENTATION,
  TOGGLE_DARK_MODE,
  UPDATE_MODAL_POSITION,
  UPDATE_MODAL_TAB_INDEX_OBJ,
} from './types'

type State = {
  orientation: string
  darkMode: boolean
  modalPosition: string
  modalTabIndexObj: {index: number}
}

export const initState = {
  orientation: 'portrait',
  darkMode: false,
  modalPosition: 'closed',
  modalTabIndexObj: {index: 0},
}

const reducer = (state = initState, action: ActionTypes): State => {
  switch (action.type) {
    case UPDATE_ORIENTATION:
      return {...state, orientation: action.payload}
    case TOGGLE_DARK_MODE:
      return {...state, darkMode: !state.darkMode}
    case UPDATE_MODAL_POSITION:
      return {...state, modalPosition: action.payload}
    case UPDATE_MODAL_TAB_INDEX_OBJ:
      return {...state, modalTabIndexObj: action.payload}
    default:
      return state
  }
}

export default reducer
