import { Meteor } from 'meteor/meteor'
import { getAllUser,insertUser,removeUser} from '../../userdata/methods'

Meteor.methods({
  'userlist.insert': insertUser,
  'userlist.remove': removeUser
})
Meteor.publish('userlist.myusers', getAllUser)
