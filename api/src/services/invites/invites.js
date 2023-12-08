import moment from 'moment'
import * as nodemailer from 'nodemailer'

import { db } from 'src/lib/db'

const hbs = require('nodemailer-express-handlebars')

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

export const emailInvite = async ({ inviteId, userId }) => {
  const invite = await db.invite.findUnique({
    where: { id: inviteId },
  })
  const user = await db.user.findUnique({
    where: { id: userId },
  })
  const event = await db.event.findUnique({
    where: { id: invite.eventId },
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
    from: 'owner@example.com',
    to: user.email,
    subject: "Jingle all the way! You're invited to a Secret Santa Celebration",
    template: 'invite',
    context: {
      name: user.name,
      eventName: event.name,
      eventDate: moment(event.date).format('MM/DD/YYYY'),
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

  return invite
}

export const Invite = {
  event: (_obj, { root }) => {
    return db.invite.findUnique({ where: { id: root?.id } }).event()
  },
  user: (_obj, { root }) => {
    return db.invite.findUnique({ where: { id: root?.id } }).user()
  },
}
