import reducer, {initState} from '../reducer'
import {
  UPDATE_ORIENTATION,
  TOGGLE_DARK_MODE,
  UPDATE_MODAL_POSITION,
  UPDATE_MODAL_TAB_INDEX_OBJ,
} from '../types'

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState)
  })

  it('should handle UPDATE_ORIENTATION', () => {
    expect(
      reducer(initState, {
        type: UPDATE_ORIENTATION,
        payload: 'landscape',
      }),
    ).toEqual({...initState, orientation: 'landscape'})
  })

  it('should handle TOGGLE_DARK_MODE', () => {
    expect(
      reducer(initState, {
        type: TOGGLE_DARK_MODE,
      }),
    ).toEqual({...initState, darkMode: true})
  })

  it('should handle UPDATE_MODAL_POSITION', () => {
    expect(
      reducer(initState, {
        type: UPDATE_MODAL_POSITION,
        payload: 'initial',
      }),
    ).toEqual({...initState, modalPosition: 'initial'})
  })

  it('should handle UPDATE_MODAL_TAB_INDEX_OBJ', () => {
    expect(
      reducer(initState, {
        type: UPDATE_MODAL_TAB_INDEX_OBJ,
        payload: {index: 1},
      }),
    ).toEqual({...initState, modalTabIndexObj: {index: 1}})
  })
})
