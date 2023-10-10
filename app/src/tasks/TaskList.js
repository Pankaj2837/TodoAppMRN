import Meteor from '@meteorrn/core'
import React, { useState } from 'react'
import { Text, View, SafeAreaView, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { TasksCollection } from './TasksCollection'
import { Task } from './Task'
import { useAccount } from '../hooks/useAccount'
import { defaultStyles } from '../styles/defaultStyles'

const { useTracker } = Meteor
const toggleChecked = ({ _id, checked }) => Meteor.call('tasks.setIsChecked', { _id, checked })
const deleteTask = ({ _id }) => Meteor.call('tasks.remove', { _id })

export const TaskList = ({navigation}) => {
  const { user } = useAccount()
  const [hideCompleted, setHideCompleted] = useState(false)

  // prevent errors when authentication is complete but user is not yet set
  if (!user) { return null }

  const hideCompletedFilter = { checked: { $ne: true } }
  const userFilter = { userId: user._id }
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter }

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const tasksData = { tasks: [], pendingTasksCount: 0 }
    if (!user) {
      return tasksData
    }
    const handler = Meteor.subscribe('tasks.my')

    if (!handler.ready()) {
      return { ...tasksData, isLoading: true }
    }

    // const filter = hideCompleted
    //   ? pendingOnlyFilter
    //   : userFilter
    const tasks = TasksCollection.find( {},{ sort: { createdAt: -1 } }).fetch()
    const pendingTasksCount = TasksCollection.find().count()
console.log(tasks);
    return { tasks, pendingTasksCount }
  }, [hideCompleted])

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''}`

  return (
    <SafeAreaView style={styles.container}>
      <View style={defaultStyles.container}>
        <View>
          <Text>My Tasks {pendingTasksTitle}</Text>
        </View>
        <FlatList 
          data={tasks}
          renderItem={({ item: task }) => (
            <Task
              task={task}
              navigation={navigation}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask} />
          )}
          keyExtractor={task => task._id}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    width:'120%',
    backgroundColor: "#3fccd1",
    alignItems: "center",
    justifyContent: "center",
    height: '105%'
  }
});