import { UserlistCollection } from './UserlistCollection' 
import { NotSignedInError } from '../errors/NotSignedInError'

const checkUser = userId => {
  if (!userId) {
    throw new NotSignedInError({ userId })
  }
}


export const getAllUser = function () {
  const userId = this.userId
  checkUser(userId)
  return UserlistCollection.find({})
}
export const insertUser = function ({ firstName,lastName,email,password }) {
  const createdAt = new Date()
  return UserlistCollection.insert({ firstName, lastName, email, password, createdAt })
}

export const removeUser = function ({ userListId }) {
  const userId = this.userId
  checkUser(userId)
  return UserlistCollection.remove({ userListId, userId })
}
