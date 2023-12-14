import { db } from 'src/lib/db'

export const pairings = () => {
  return db.pairing.findMany()
}

export const pairingsByEvent = ({ eventId }) => {
  return db.pairing.findMany({ where: { eventId } })
}

export const pairing = ({ id }) => {
  return db.pairing.findUnique({
    where: { id },
  })
}

export const createPairing = ({ input }) => {
  return db.pairing.create({
    data: input,
  })
}

export const updatePairing = ({ id, input }) => {
  return db.pairing.update({
    data: input,
    where: { id },
  })
}

export const deletePairing = ({ id }) => {
  return db.pairing.delete({
    where: { id },
  })
}

export const Pairing = {
  event: (_obj, { root }) => {
    return db.pairing.findUnique({ where: { id: root?.id } }).event()
  },
  santa: (_obj, { root }) => {
    return db.pairing.findUnique({ where: { id: root?.id } }).santa()
  },
  person: (_obj, { root }) => {
    return db.pairing.findUnique({ where: { id: root?.id } }).person()
  },
}
