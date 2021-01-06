import React, {memo} from 'react'
import {useSelector} from 'react-redux'
import {ScrollView, StyleSheet, Dimensions} from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import {Card, CardItem, Body, Text, Button, Icon} from 'native-base'

import {MODAL_HEIGHT_PORTRAIT, MODAL_HEIGHT_LANDSCAPE} from '../settings'
import {RootState} from '../redux/store'

type Props = {
  route: {
    key: string
    title: string
    subtitle: string
    description: {background: string; events: string; aftermath: string}
    links: [
      {
        name: string
        icon: string
        url: string
      },
    ]
  }
}

const TabRoute = memo(
  ({
    route: {
      key,
      title,
      subtitle,
      description: {background, events, aftermath},
      links,
    },
  }: Props) => {
    const {orientation, darkMode, modalPosition} = useSelector(
      (state: RootState) => state,
    )

    const ContainerStyle = darkMode ? styles.darkContainer : {}
    const TextStyle = darkMode ? styles.lightText : {}

    return (
      <ScrollView
        style={{
          height:
            modalPosition === 'initial'
              ? orientation === 'landscape'
                ? MODAL_HEIGHT_LANDSCAPE
                : MODAL_HEIGHT_PORTRAIT
              : Dimensions.get('window').height * 0.87, // magical number for android landscape
        }}
      >
        <Card transparent style={styles.card}>
          <CardItem header style={ContainerStyle}>
            <Body>
              <Text style={[styles.content__heading, TextStyle]}>{title}</Text>
              {!!subtitle && <Text note>{subtitle}</Text>}
            </Body>
          </CardItem>

          {[
            {title: 'Background', content: background},
            {title: 'Events', content: events},
            {title: 'Aftermath', content: aftermath},
          ].map(
            ({title, content}) =>
              !!content && (
                <CardItem key={`${key}-${title}`} style={ContainerStyle}>
                  <Body>
                    <Text note>{title}</Text>
                    <Text style={[styles.content__paragraph, TextStyle]}>
                      {content}
                    </Text>
                  </Body>
                </CardItem>
              ),
          )}

          {links.map(({name, icon, url}) => (
            <CardItem key={url} style={ContainerStyle}>
              <Button
                style={styles.content__button}
                iconLeft
                onPress={() => {
                  WebBrowser.openBrowserAsync(url)
                }}
              >
                <Icon type="FontAwesome5" name={icon} />
                <Text>{name}</Text>
              </Button>
            </CardItem>
          ))}
        </Card>
      </ScrollView>
    )
  },
)

const styles = StyleSheet.create({
  darkContainer: {backgroundColor: '#1a1d21'},

  lightText: {color: '#d1d2d2'},

  card: {paddingTop: 12, paddingBottom: 50},

  content__heading: {
    fontSize: 20,
  },

  content__paragraph: {
    fontSize: 15,

    lineHeight: 22,
  },

  content__button: {
    borderRadius: 50,
  },
})

export default TabRoute
