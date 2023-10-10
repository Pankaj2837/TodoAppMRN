import React from 'react'
import { View } from 'react-native'
import { defaultStyles } from '../styles/defaultStyles'
import { TaskList } from '../tasks/TaskList'

export const HomeScreen = ({navigation}) => {
  return (
    <View style={defaultStyles.container}>
      <TaskList navigation={navigation}/>
    </View>
  )
}
