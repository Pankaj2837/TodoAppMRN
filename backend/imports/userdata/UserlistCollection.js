import { Mongo } from 'meteor/mongo'

export const UserlistCollection = new Mongo.Collection('userlist')

UserlistCollection.schema = {
    firstName: {
        type: String,
        label: 'firstName',
        max: 100,
      },
    lastName: {
        type: String,
        label: 'lastName',
        max: 100,
      },
    email: {
        type: String,
        label: 'email',
        max: 100,
      },
    password:{
        type: String,
        label: 'password',
        max: 10,
      },
    createdAt: {
        type: Date,
        label: 'createdAt'
      }
}

UserlistCollection.attachSchema(UserlistCollection.schema)
