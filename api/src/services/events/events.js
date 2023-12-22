import { db } from 'src/lib/db'

export const events = () => {
  return db.event.findMany()
}

export const currentUserEvents = () => {
  return db.event.findMany({
    where: { ownerId: context.currentUser.id },
    include: {
      invites: true,
      pairings: true,
      owner: true,
    },
  })
}

export const event = ({ id }) => {
  return db.event.findUnique({
    where: { id },
  })
}

export const createEvent = ({ input }) => {
  return db.event.create({
    data: { ...input, ownerId: context.currentUser.id },
  })
}

export const updateEvent = ({ id, input }) => {
  return db.event.update({
    data: input,
    where: { id },
  })
}

export const deleteEvent = ({ id }) => {
  return db.event.delete({
    where: { id },
  })
}

export const Event = {
  pairings: (_obj, { root }) => {
    return db.event.findUnique({ where: { id: root?.id } }).pairings()
  },
  thankYous: (_obj, { root }) => {
    return db.event.findUnique({ where: { id: root?.id } }).thankYous()
  },
  wishLists: (_obj, { root }) => {
    return db.event.findUnique({ where: { id: root?.id } }).wishLists()
  },
}
