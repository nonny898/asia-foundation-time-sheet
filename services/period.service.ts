import {
  PeriodDetailInterface,
  PeriodFormInterface,
} from '~/types/Period/period.types'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { $fire } from '~/utils/api'

export const getPeriod = async (
  form: PeriodFormInterface
): Promise<PeriodDetailInterface> => {
  const querySnapshot = await $fire.firestore
    .collection('periods')
    .where('user_id', '==', form.userId)
    .where('month', '==', form.month)
    .where('year', '==', form.year)
    .get()
  if (querySnapshot.size === 0) {
    const newPeriod = await createPeriod(form)
    return newPeriod
  } else {
    const response: PeriodDetailInterface[] = []
    querySnapshot.forEach((doc) => {
      response.push({
        ...camelizeKeys(doc.data()),
        id: doc.id,
      })
    })
    return response[0]
  }
}

export const createPeriod = async (form: PeriodFormInterface) => {
  const docRef = await $fire.firestore
    .collection('periods')
    .add(decamelizeKeys(form))
  return {
    ...camelizeKeys(form),
    id: docRef.id,
  }
}
