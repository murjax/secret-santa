import {
  invites,
  invite,
  createInvite,
  updateInvite,
  deleteInvite,
} from './invites'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('invites', () => {
  scenario('returns all invites', async (scenario) => {
    const result = await invites()

    expect(result.length).toEqual(Object.keys(scenario.invite).length)
  })

  scenario('returns a single invite', async (scenario) => {
    const result = await invite({ id: scenario.invite.one.id })

    expect(result).toEqual(scenario.invite.one)
  })

  scenario('creates a invite', async (scenario) => {
    const result = await createInvite({
      input: {
        eventId: scenario.invite.two.eventId,
        userId: scenario.invite.two.userId,
        status: 'INVITED',
      },
    })

    expect(result.eventId).toEqual(scenario.invite.two.eventId)
    expect(result.userId).toEqual(scenario.invite.two.userId)
    expect(result.status).toEqual('INVITED')
  })

  scenario('updates a invite', async (scenario) => {
    const original = await invite({ id: scenario.invite.one.id })
    const result = await updateInvite({
      id: original.id,
      input: { status: 'ACCEPTED' },
    })

    expect(result.status).toEqual('ACCEPTED')
  })

  scenario('deletes a invite', async (scenario) => {
    const original = await deleteInvite({
      id: scenario.invite.one.id,
    })
    const result = await invite({ id: original.id })

    expect(result).toEqual(null)
  })
})
