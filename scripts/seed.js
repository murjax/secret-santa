import { db } from 'api/src/lib/db'
import moment from 'moment'

export default async () => {
  try {
    const hashedPassword = 'd6071193f081fa0563ed99c01388dfc9797ea06d7e7bad953bd77224f7738835'
    const salt = 'c347443ebaa50453d5481145dcb1b008e3b8f0d332b3f3ab29c2a01746ce83a3'

    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    await db.user.create({ data: { name: 'Event Owner', email: 'eventowner@example.com', hashedPassword, salt } })

    const eventOneData = {
      name: 'Event One',
      date: moment().subtract(2, 'd').toISOString(),
      ownerId: 1,
    }
    const eventTwoData = {
      name: 'Event Two',
      date: moment().add(2, 'd').toISOString(),
      ownerId: 1,
    }
    await db.event.create({ data: eventOneData })
    await db.event.create({ data: eventTwoData })

    await db.user.create({ data: { name: 'Invite One', email: 'invite1@example.com', hashedPassword, salt } })
    await db.user.create({ data: { name: 'Invite Two', email: 'invite2@example.com', hashedPassword, salt } })
    await db.user.create({ data: { name: 'Invite Three', email: 'invite3@example.com', hashedPassword, salt } })
    await db.user.create({ data: { name: 'Invite Four', email: 'invite4@example.com', hashedPassword, salt } })
    await db.user.create({ data: { name: 'Invite Five', email: 'invite5@example.com', hashedPassword, salt } })
    await db.user.create({ data: { name: 'Invite Six', email: 'invite6@example.com', hashedPassword, salt } })
    await db.user.create({ data: { name: 'Invite Seven', email: 'invite7@example.com', hashedPassword, salt } })
    await db.user.create({ data: { name: 'Invite Eight', email: 'invite8@example.com', hashedPassword, salt } })
    await db.user.create({ data: { name: 'Invite Nine', email: 'invite9@example.com', hashedPassword, salt } })
    await db.user.create({ data: { name: 'Invite Ten', email: 'invite10@example.com', hashedPassword, salt } })

    await db.invite.create({ data: { eventId: 1, name: 'Invite One', email: 'invite1@example.com', userId: 2, status: 'ACCEPTED' } })
    await db.invite.create({ data: { eventId: 1, name: 'Invite Two', email: 'invite2@example.com', userId: 3, status: 'ACCEPTED' } })
    await db.invite.create({ data: { eventId: 1, name: 'Invite Three', email: 'invite3@example.com', userId: 4, status: 'ACCEPTED' } })
    await db.invite.create({ data: { eventId: 1, name: 'Invite Four', email: 'invite4@example.com', userId: 5, status: 'INVITED' } })
    await db.invite.create({ data: { eventId: 1, name: 'Invite Five', email: 'invite5@example.com', userId: 6, status: 'DECLINED' } })
    await db.invite.create({ data: { eventId: 2, name: 'Invite Six', email: 'invite6@example.com', userId: 7, status: 'ACCEPTED' } })
    await db.invite.create({ data: { eventId: 2, name: 'Invite Seven', email: 'invite7@example.com', userId: 8, status: 'ACCEPTED' } })
    await db.invite.create({ data: { eventId: 2, name: 'Invite Eight', email: 'invite8@example.com', userId: 9, status: 'ACCEPTED' } })
    await db.invite.create({ data: { eventId: 2, name: 'Invite Nine', email: 'invite9@example.com', userId: 10, status: 'INVITED' } })
    await db.invite.create({ data: { eventId: 2, name: 'Invite Ten', email: 'invite10@example.com', userId: 11, status: 'DECLINED' } })

    await db.wishList.create({ data: { eventId: 1, userId: 2, name: 'Item 1', url: 'https://google.com', siteImage: 'https://images.google.com/1.jpg', siteTitle: 'Title', siteDescription: 'Description' } })
    await db.wishList.create({ data: { eventId: 1, userId: 3, name: 'Item 2', url: 'https://google.com', siteImage: 'https://images.google.com/1.jpg', siteTitle: 'Title', siteDescription: 'Description' } })
    await db.wishList.create({ data: { eventId: 1, userId: 4, name: 'Item 3', url: 'https://google.com', siteImage: 'https://images.google.com/1.jpg', siteTitle: 'Title', siteDescription: 'Description' } })
    await db.wishList.create({ data: { eventId: 2, userId: 7, name: 'Item 4', url: 'https://google.com', siteImage: 'https://images.google.com/1.jpg', siteTitle: 'Title', siteDescription: 'Description' } })
    await db.wishList.create({ data: { eventId: 2, userId: 8, name: 'Item 5', url: 'https://google.com', siteImage: 'https://images.google.com/1.jpg', siteTitle: 'Title', siteDescription: 'Description' } })
    await db.wishList.create({ data: { eventId: 2, userId: 9, name: 'Item 6', url: 'https://google.com', siteImage: 'https://images.google.com/1.jpg', siteTitle: 'Title', siteDescription: 'Description' } })

    // const data = [ // To try this example data with the UserExample model in schema.prisma,
      // uncomment the lines below and run 'yarn rw prisma migrate dev'
      //
      // { name: 'alice', email: 'alice@example.com' },
      // { name: 'mark', email: 'mark@example.com' },
      // { name: 'jackie', email: 'jackie@example.com' },
      // { name: 'bob', email: 'bob@example.com' },
    // ]
    // console.log(
    //   "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    // )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    // await Promise.all(
      //
      // Change to match your data model and seeding needs
      //
      // data.map(async (data) => {
      //   const record = await db.userExample.create({ data })
      //   console.log(record)
      // })
    // )

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/auth-dbauth-api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (const user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
