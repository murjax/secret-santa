import moment from 'moment'
import * as nodemailer from 'nodemailer'

import { db } from 'src/lib/db'

const hbs = require('nodemailer-express-handlebars')

export const invites = () => {
  return db.invite.findMany()
}

export const invitesByEvent = ({ eventId }) => {
  return db.invite.findMany({
    where: { eventId },
    include: { user: true },
  })
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

export const emailInvite = async ({ id }) => {
  const invite = await db.invite.findUnique({
    where: { id },
  })
  const event = await db.event.findUnique({
    where: { id: invite.eventId },
  })
  const owner = await db.user.findUnique({
    where: { id: event.ownerId },
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
    to: invite.email,
    subject: "Jingle all the way! You're invited to a Secret Santa Celebration",
    template: 'invite',
    context: {
      name: invite.name,
      eventName: event.name,
      eventDate: moment(event.date).format('MM/DD/YYYY'),
      inviteUrl: `http://localhost:8910/invite/${id}`,
      ownerName: owner.name,
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
