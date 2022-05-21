import { camelizeKeys, decamelizeKeys } from 'humps'
import { TaskDetailInterface } from '~/types/Task/task.types'
import { $fire } from '~/utils/api'

export const getTasks = async (userId: string, periodId: string) => {
  const response: TaskDetailInterface[] = []
  const querySnapshot = await $fire.firestore
    .collection('tasks')
    .where('user_id', '==', userId)
    .where('period_id', '==', periodId)
    .get()
  querySnapshot.forEach((doc) => {
    response.push({
      ...camelizeKeys(doc.data()),
      id: doc.id,
    })
  })
  return response
}

export const createTask = async (form: TaskDetailInterface) => {
  const docRef = await $fire.firestore
    .collection('tasks')
    .add(decamelizeKeys(form))
  return {
    ...camelizeKeys(form),
    id: docRef.id,
  }
}

export const updateTask = async (taskId: string, form: TaskDetailInterface) => {
  await $fire.firestore
    .collection('tasks')
    .doc(taskId)
    .update(decamelizeKeys(form))
}

export const deleteTask = async (taskId: string) => {
  await $fire.firestore.collection('tasks').doc(taskId).delete()
}
