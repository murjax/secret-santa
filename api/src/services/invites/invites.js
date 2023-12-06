import { db } from 'src/lib/db'

export const invites = () => {
  return db.invite.findMany()
}

export const invitesByEvent = ({ eventId }) => {
  return db.invite.findMany({ where: { eventId } })
}

export const invite = ({ id }) => {
  return db.invite.findUnique({
    where: { id },
  })
}

export const createInvite = ({ input }) => {
  return db.invite.create({
    data: input,
  })
}

export const updateInvite = ({ id, input }) => {
  return db.invite.update({
    data: input,
    where: { id },
  })
}

export const deleteInvite = ({ id }) => {
  return db.invite.delete({
    where: { id },
  })
}

export const Invite = {
  event: (_obj, { root }) => {
    return db.invite.findUnique({ where: { id: root?.id } }).event()
  },
  user: (_obj, { root }) => {
    return db.invite.findUnique({ where: { id: root?.id } }).user()
  },
}
