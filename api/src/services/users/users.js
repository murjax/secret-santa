import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const userByEmail = ({ email }) => {
  return db.user.findUnique({
    where: { email },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  wishLists: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).wishLists()
  },
  invites: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).invites()
  },
  santaPairings: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).santaPairings()
  },
  personPairings: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).personPairings()
  },
  fromThankYous: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).fromThankYous()
  },
  toThankYous: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).toThankYous()
  },
}
