/* eslint-disable react/prop-types */
import React from 'react'

import {render} from '../../../test/test-utils'

import Navigation from '../Navigation'

// mocking react navigation route key generation
jest.mock('nanoid/non-secure', () => ({
  nanoid: () => 'routeUniqId',
}))

jest.mock('react-native-maps', () => {
  // eslint-disable-next-line global-require
  const {View} = require('react-native')
  const MockMapView = ({children}) => <View>{children}</View>
  const MockMarker = ({children}) => <View>{children}</View>
  const MockPolygon = ({children}) => <View>{children}</View>

  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    Polygon: MockPolygon,
  }
})

jest.useFakeTimers()

describe('Testing Navigation', () => {
  test('Snapshot', async () => {
    const {container, toJSON} = render(<Navigation />)
    expect(toJSON(container)).toMatchSnapshot()
  })
})
