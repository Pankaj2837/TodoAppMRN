import { Mongo } from 'meteor/mongo'

export const TasksCollection = new Mongo.Collection('tasks')

TasksCollection.schema = {
    title: {
        type: String,
        label: 'title',
        max: 100,
      },
      assignTo: {
        type: String,
        label: 'assignTo',
        max: 100,
      },
      taskStatus: {
        type: String,
        label: 'taskStatus',
        max: 100,
      },
      discription: {
        type: String,
        label: 'discription',
        max: 1000,
      },
      userId: {
        type: String,
        label: 'userId',
      },
      createdAt: {
        type: Date,
        label: 'createdAt'
      },
      completedAt: {
        type: Date,
        label: 'completedAt',
        optional:true
      }

}

TasksCollection.attachSchema(TasksCollection.schema)
