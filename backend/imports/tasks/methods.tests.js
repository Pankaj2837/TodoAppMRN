import { Random } from 'meteor/random'
import { TasksCollection } from './TasksCollection'
import { restoreCollections, stubCollection } from '../../tests/stubCollection'
import {
  checkTask,
  getMyTasks,
  insertTask,
  removeTask
} from './methods'
import { expect } from 'chai'
import { NotSignedInError } from '../errors/NotSignedInError'

describe('tasks.methods', function () {
  let userId
  let env

  before(function () {
    stubCollection(TasksCollection)
  })
  after(function () {
    restoreCollections()
  })
  beforeEach(function () {
    TasksCollection.remove({})
    userId = Random.id()
    env = { userId }
  })

  const createTaskDoc = ({
    createdAt = new Date(),
    userId,
    title =Random.id(),
    assignTo =Random.id(),
    discription = Random.id(),
    taskStatus = Random.id()
  }) => {
    const taskId = TasksCollection.insert({ title, assignTo, discription,taskStatus, userId, createdAt })
    return TasksCollection.findOne({ _id: taskId })
  }

  const throwsWithoutUser = fn => it('throws if user is not in this-scope', () => {
    const thrown = expect(() => fn({})).to.throw(NotSignedInError.NAME)
    thrown.with.property('reason', NotSignedInError.REASON)
    thrown.with.deep.property('details', { userId: undefined })
  })

  describe(checkTask.name, function () {
    throwsWithoutUser(checkTask)
    it('updates the checked status for a task', () => {
      const taskDoc = createTaskDoc({ userId })
      expect(taskDoc.checked).to.equal(false)

      const { _id } = taskDoc
      checkTask.call(env, { _id, checked: true })

      const updatedDoc = TasksCollection.findOne({ _id })
      expect(updatedDoc.checked).to.equal(true)
    })
  })
  describe(getMyTasks.name, function () {
    throwsWithoutUser(getMyTasks)
    it('returns all tasks by a given user, if any exist', () => {
      expect(getMyTasks.call(env).fetch()).to.deep.equal([])

      // add some tasks
      const allTasks = new Array(10)
        .fill(1)
        .map(() => createTaskDoc({ userId }))

      expect(getMyTasks.call(env).fetch()).to.deep.equal(allTasks)
    })
  })
  describe(insertTask.name, function () {
    throwsWithoutUser(insertTask)
    it('inserts a new task doc', () => {
      const title = Random.id()
      const assignTo = Random.id()
      const discription = Random.id()
       const taskStatus = Random.id()
      const taskId = insertTask.call(env, { title,assignTo,discription,taskStatus})
      const taskDoc = TasksCollection.findOne(taskId)
      expect(taskDoc.userId).to.equal(userId)
      expect(taskDoc.createdAt).to.be.instanceof(Date)
      expect(taskDoc.text).to.equal(text)
    })
  })
  describe(removeTask.name, function () {
    throwsWithoutUser(removeTask)
    it('removes a task doc', () => {
      const taskDoc = createTaskDoc({ userId })
      expect(TasksCollection.find().count()).to.equal(1)

      expect(removeTask.call(env, { _id: Random.id() })).to.equal(0)
      expect(removeTask.call(env, { _id: taskDoc._id })).to.equal(1)

      expect(TasksCollection.find().count()).to.equal(0)
    })
  })
})
