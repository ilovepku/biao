import React, {FC} from 'react'
import {useSelector} from 'react-redux'
import {StyleSheet} from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import {
  Container,
  Left,
  Right,
  Icon,
  Body,
  Content,
  ListItem,
  Text,
  Thumbnail,
} from 'native-base'

import {RootState} from '../redux/store'
import CustomHeader from '../components/CustomHeader'

const AboutScreen: FC = () => {
  const {darkMode} = useSelector((state: RootState) => state)

  const handleOpenProjectIntro = () => {
    WebBrowser.openBrowserAsync('https://seanlee.netlify.app/portfolio/biao')
  }

  const handleOpenGitHubRepo = () => {
    WebBrowser.openBrowserAsync('https://github.com/ilovepku/biao')
  }

  const handleOpenPortfolio = () => {
    WebBrowser.openBrowserAsync('https://seanlee.netlify.com')
  }

  const ContentStyle = darkMode ? styles.blackContainer : {}
  const DividerStyle = darkMode ? styles.darkContainer : {}
  const TextStyle = darkMode ? styles.lightText : {}

  return (
    <Container>
      <CustomHeader title="About" />
      <Content style={ContentStyle}>
        <ListItem style={DividerStyle} itemDivider>
          <Text style={TextStyle}>BIAO! StoryMap</Text>
        </ListItem>
        <ListItem icon last>
          <Left>
            <Icon style={TextStyle} type="Octicons" name="versions" />
          </Left>
          <Body>
            <Text style={TextStyle}>Version</Text>
          </Body>
          <Right>
            <Text>1.0</Text>
          </Right>
        </ListItem>

        <ListItem style={DividerStyle} itemDivider>
          <Text style={TextStyle}>Support</Text>
        </ListItem>
        <ListItem icon last onPress={handleOpenProjectIntro}>
          <Left>
            <Icon style={TextStyle} type="Octicons" name="info" />
          </Left>
          <Body>
            <Text style={TextStyle}>Project introduction</Text>
          </Body>
        </ListItem>

        <ListItem style={DividerStyle} itemDivider>
          <Text style={TextStyle}>Third-party projects that helped</Text>
        </ListItem>
        <ListItem icon last onPress={handleOpenGitHubRepo}>
          <Left>
            <Icon style={TextStyle} type="FontAwesome" name="github" />
          </Left>
          <Body>
            <Text style={TextStyle}>Source code</Text>
          </Body>
        </ListItem>

        <ListItem style={DividerStyle} itemDivider>
          <Text style={TextStyle}>People</Text>
        </ListItem>
        <ListItem thumbnail last onPress={handleOpenPortfolio}>
          <Left>
            <Thumbnail
              square
              source={{
                uri:
                  'https://seanlee.netlify.app/static/9b425e213ec5b64cfa3ef8bc2a8e6d7b/69585/profile.png',
              }}
            />
          </Left>
          <Body>
            <Text style={TextStyle}>Sean Lee</Text>
            <Text note>seanlee.netlify.com</Text>
          </Body>
          <Right>
            <Text note>Creator</Text>
          </Right>
        </ListItem>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  blackContainer: {backgroundColor: '#000'},

  darkContainer: {backgroundColor: '#1a1d21'},

  lightText: {color: '#fff'},
})

export default AboutScreen
