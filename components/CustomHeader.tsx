import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {Header, Title, Left, Right, Button, Icon, Body} from 'native-base'

type Props = {
  title: string
}

const CustomHeader = ({title}: Props) => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleOpenDrawer = () => {
    // @ts-ignore: temp fix
    navigation.openDrawer()
  }

  return (
    <Header>
      <Left>
        <Button transparent onPress={handleGoBack}>
          <Icon type="Ionicons" name="ios-arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right>
        <Button transparent onPress={handleOpenDrawer}>
          <Icon type="MaterialCommunityIcons" name="menu" />
        </Button>
      </Right>
    </Header>
  )
}

export default CustomHeader
