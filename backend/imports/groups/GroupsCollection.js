import { Mongo } from 'meteor/mongo'

export const GroupsCollection = new Mongo.Collection('groups')

GroupsCollection.schema = {
    groupTitle: {
        type: String,
        label: 'groupTitle',
        max: 100,
    },
    createdByUser:{
        type: String,
        label: 'createdByUser',
        max: 100,
    },
    groupMembers: {
        type: Object,
        label: 'groupMembers'
    },
    createdAt: {
        type: Date,
        label: 'createdAt'
    }
}

GroupsCollection.attachSchema(GroupsCollection.schema)
