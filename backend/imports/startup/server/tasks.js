import { Meteor } from 'meteor/meteor'
import { updateTask, insertTask, getMyTasks, removeTask } from '../../tasks/methods'
const checkUser = userId => {
  if (!userId) {
    throw new NotSignedInError({ userId })
  }
}
Meteor.methods({
  'tasks.insert':insertTask,
  'tasks.updateTask': updateTask,
  'tasks.remove': removeTask
})
Meteor.publish('tasks.my', getMyTasks)

