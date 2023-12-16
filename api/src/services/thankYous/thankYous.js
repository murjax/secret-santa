import { db } from 'src/lib/db'

export const thankYous = () => {
  return db.thankYou.findMany()
}

export const thankYou = ({ id }) => {
  return db.thankYou.findUnique({
    where: { id },
  })
}

export const createThankYou = ({ input }) => {
  return db.thankYou.create({
    data: input,
  })
}

export const updateThankYou = ({ id, input }) => {
  return db.thankYou.update({
    data: input,
    where: { id },
  })
}

export const deleteThankYou = ({ id }) => {
  return db.thankYou.delete({
    where: { id },
  })
}

export const ThankYou = {
  event: (_obj, { root }) => {
    return db.thankYou.findUnique({ where: { id: root?.id } }).event()
  },
  user: (_obj, { root }) => {
    return db.thankYou.findUnique({ where: { id: root?.id } }).user()
  },
  toUser: (_obj, { root }) => {
    return db.thankYou.findUnique({ where: { id: root?.id } }).toUser()
  },
}
