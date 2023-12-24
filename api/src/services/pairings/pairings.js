import moment from 'moment'
import * as nodemailer from 'nodemailer'

import { db } from 'src/lib/db'

const hbs = require('nodemailer-express-handlebars')

export const pairings = () => {
  return db.pairing.findMany()
}

export const pairingsByEvent = ({ eventId }) => {
  return db.pairing.findMany({ where: { eventId } })
}

export const currentUserPairings = () => {
  return db.pairing.findMany({
    where: { personId: context.currentUser.id },
    include: {
      santa: true,
    },
  })
}

export const currentUserSantaPairings = () => {
  return db.pairing.findMany({
    where: { santaId: context.currentUser.id },
    include: {
      santa: true,
    },
  })
}

export const currentUserPersonPairings = () => {
  return db.pairing.findMany({
    where: { personId: context.currentUser.id },
    include: {
      person: true,
    },
  })
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

export const deletePairingsByEvent = ({ eventId }) => {
  return db.pairing.deleteMany({
    where: { eventId },
  })
}

export const emailPairing = async ({ id }) => {
  const pairing = await db.pairing.findUnique({
    where: { id },
    include: {
      santa: true,
      person: true,
      event: true,
    },
  })

  const owner = await db.event.findUnique({
    where: { id: pairing.event.ownerId },
  })

  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false,
  })

  transporter.use(
    'compile',
    hbs({
      viewEngine: {
        extName: '.handlebars',
        layoutsDir: 'api/src/lib/email-templates',
        defaultLayout: false,
      },
      viewPath: 'api/src/lib/email-templates',
      extName: '.handlebars',
    })
  )

  await transporter.sendMail({
    from: owner.email,
    to: pairing.santa.email,
    subject: "🎅 Ho-Ho-Hold Up! You've Been Secretly Santa'd! 🎁",
    template: 'pairing',
    context: {
      name: pairing.santa.name,
      personName: pairing.person.name,
      eventDate: moment(pairing.event.date).format('MM/DD/YYYY'),
    },
    attachments: [
      {
        filename: 'background.svg',
        path: 'api/src/lib/email-templates/background.svg',
        cid: 'background',
      },
      {
        filename: 'logo.svg',
        path: 'api/src/lib/email-templates/logo.svg',
        cid: 'logo',
      },
    ],
  })

  return pairing
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
