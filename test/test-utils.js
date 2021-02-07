import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render as rntlRender} from '@testing-library/react-native'

import reducer, {initState} from '../src/redux/reducer'

const render = (
  ui,
  {
    initialState = initState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {},
) => {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({children}) => <Provider store={store}>{children}</Provider>

  return {
    ...rntlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    store,
  }
}

export * from '@testing-library/react-native'
export {render}
