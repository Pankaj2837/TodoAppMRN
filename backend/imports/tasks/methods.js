import { TasksCollection } from './TasksCollection'
import { NotSignedInError } from '../errors/NotSignedInError'

const checkUser = userId => {
  if (!userId) {
    throw new NotSignedInError({ userId })
  }
}

export const getMyTasks = function () {
  const userId = this.userId
  checkUser(userId)
  return TasksCollection.find({})
}
export const insertTask = function ({title, assignTo, discription,taskStatus}) {
  const userId = this.userId
  let completedAt;
  checkUser(userId)
  if(taskStatus==="Completed"){
    completedAt= new Date();
  }
  const createdAt = new Date()
  return TasksCollection.insert({title, assignTo, discription,taskStatus, userId, createdAt,completedAt})
}
export const updateTask = function ({_id ,title, assignTo, discription, taskStatus }) {
  const userId = this.userId
  let completedAt;
  if(taskStatus==="Completed"){
    completedAt= new Date();
  }
  checkUser(userId)
  return TasksCollection.update({_id }, { $set: { title, assignTo, discription, taskStatus,completedAt } })
}

export const removeTask = function ({ _id }) {
  const userId = this.userId
  checkUser(userId)
  return TasksCollection.remove({ _id, userId })
}
