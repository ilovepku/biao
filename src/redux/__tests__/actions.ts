import {
  updateOrientation,
  toggleDarkMode,
  updateModalPosition,
  updateModalTabIndexObj,
} from '../actions'
import {
  UPDATE_ORIENTATION,
  TOGGLE_DARK_MODE,
  UPDATE_MODAL_POSITION,
  UPDATE_MODAL_TAB_INDEX_OBJ,
} from '../types'

describe('updateOrientation action', () => {
  it('should create an action to update orientation', () => {
    const expectedAction = {
      type: UPDATE_ORIENTATION,
      payload: 'portrait',
    }
    expect(updateOrientation('portrait')).toEqual(expectedAction)
  })
})

describe('toggleDarkMode action', () => {
  it('should create an action to toggle dark mode', () => {
    const expectedAction = {
      type: TOGGLE_DARK_MODE,
    }
    expect(toggleDarkMode()).toEqual(expectedAction)
  })
})

describe('updateModalPosition action', () => {
  it('should create an action to update modal position', () => {
    const expectedAction = {
      type: UPDATE_MODAL_POSITION,
      payload: 'closed',
    }
    expect(updateModalPosition('closed')).toEqual(expectedAction)
  })
})

describe('updateModalTabIndexObj action', () => {
  it('should create an action to update modal tab index obj', () => {
    const expectedAction = {
      type: UPDATE_MODAL_TAB_INDEX_OBJ,
      payload: {index: 0},
    }
    expect(updateModalTabIndexObj({index: 0})).toEqual(expectedAction)
  })
})
