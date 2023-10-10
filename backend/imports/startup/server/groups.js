import { Meteor } from 'meteor/meteor'
import { updateGroup, insertGroup, getAllGroups, removeGroup } from '../../groups/methods'

Meteor.methods({
  'groups.insert':insertGroup,
  'groups.update': updateGroup,
  'groups.remove': removeGroup
})
Meteor.publish('groups.myGroups', getAllGroups)