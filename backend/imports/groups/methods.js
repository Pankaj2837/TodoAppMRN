import { GroupsCollection } from './GroupsCollection'
import { NotSignedInError } from '../errors/NotSignedInError'

const checkUser = userId => {
  if (!userId) {
    throw new NotSignedInError({ userId })
  }
}
export const getAllGroups = function () {
  const userId = this.userId
  checkUser(userId)
  return GroupsCollection.find({})
}
export const insertGroup = function ({ groupTitle,groupMembers}) {
  const createdByUser = this.userId
  checkUser(createdByUser)
  const createdAt = new Date()
  return GroupsCollection.insert({ groupTitle,createdByUser,groupMembers, createdAt })
}
export const updateGroup = function ({_id ,title, assignTo, discription, taskStatus}) {
  const userId = this.userId
  checkUser(userId)
  return GroupsCollection.update({_id }, { $set: { title, assignTo, discription, taskStatus,completedAt } })
}
export const removeGroup = function ({ userListId }) {
  const userId = this.userId
  checkUser(userId)
  return GroupsCollection.remove({ userListId, userId })
}
