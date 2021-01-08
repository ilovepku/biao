import React from 'react'
import {useSelector} from 'react-redux'
import {StyleSheet} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Container, Left, Body, Content, ListItem, Text} from 'native-base'

import {EMOJI_MAP} from '../settings'
import {
  AREA_COLOR_MAP,
  MARKER_COLOR_MAP,
} from '../../assets/peloponnesian_war/settings'
import {RootState} from '../redux/store'
import IconMarker from '../components/IconMarker'
import CustomHeader from '../components/CustomHeader'

const LegendScreen: React.FC = () => {
  const {darkMode} = useSelector((state: RootState) => state)

  const ContentStyle = darkMode ? styles.blackContainer : {}
  const DividerStyle = darkMode ? styles.darkContainer : {}
  const TextStyle = darkMode ? styles.lightText : {}

  return (
    <Container>
      <CustomHeader title="Legend" />
      <Content style={ContentStyle}>
        <ListItem style={DividerStyle} itemDivider>
          <Text style={TextStyle}>Area Fill Colors:</Text>
        </ListItem>
        {Object.keys(AREA_COLOR_MAP).map((key, index, array) => (
          <ListItem
            key={`legend-area-${key}`}
            icon
            last={index === array.length - 1}
          >
            <Left>
              <MaterialCommunityIcons
                name="square"
                size={24}
                color={AREA_COLOR_MAP[key].color}
              />
            </Left>
            <Body>
              <Text style={TextStyle}>{AREA_COLOR_MAP[key].name}</Text>
            </Body>
          </ListItem>
        ))}

        <ListItem style={DividerStyle} itemDivider>
          <Text style={TextStyle}>City Markers:</Text>
        </ListItem>
        {Object.keys(MARKER_COLOR_MAP).map((key, index, array) => (
          <ListItem
            key={`legend-marker-city-${key}`}
            icon
            last={index === array.length - 1}
          >
            <Left style={styles.marker}>
              <IconMarker name="city" color={MARKER_COLOR_MAP[key].color} />
            </Left>
            <Body>
              <Text style={TextStyle}>{MARKER_COLOR_MAP[key].city}</Text>
            </Body>
          </ListItem>
        ))}

        <ListItem style={DividerStyle} itemDivider>
          <Text style={TextStyle}>Battle Markers:</Text>
        </ListItem>
        {Object.keys(MARKER_COLOR_MAP).map((key, index, array) => (
          <ListItem
            key={`legend-marker-battle-${key}`}
            icon
            last={index === array.length - 1}
          >
            <Left style={styles.marker}>
              <IconMarker name="battle" color={MARKER_COLOR_MAP[key].color} />
            </Left>
            <Body>
              <Text style={TextStyle}>{MARKER_COLOR_MAP[key].battle}</Text>
            </Body>
          </ListItem>
        ))}

        <ListItem style={DividerStyle} itemDivider>
          <Text style={TextStyle}>Timeline Icons:</Text>
        </ListItem>
        {Object.keys(EMOJI_MAP).map((key, index, array) => (
          <ListItem
            key={`legend-timeline-icon-${key}`}
            icon
            last={index === array.length - 1}
          >
            <Left>
              <Text style={TextStyle}>{EMOJI_MAP[key].emoji}</Text>
            </Left>
            <Body>
              <Text style={TextStyle}>{EMOJI_MAP[key].name}</Text>
            </Body>
          </ListItem>
        ))}
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  blackContainer: {backgroundColor: '#000'},

  darkContainer: {backgroundColor: '#1a1d21'},

  lightText: {color: '#fff'},

  marker: {
    transform: [{rotate: '45deg'}],
  },
})

export default LegendScreen
