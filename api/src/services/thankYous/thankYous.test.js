import {
  thankYous,
  thankYou,
  createThankYou,
  updateThankYou,
  deleteThankYou,
} from './thankYous'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('thankYous', () => {
  scenario('returns all thankYous', async (scenario) => {
    const result = await thankYous()

    expect(result.length).toEqual(Object.keys(scenario.thankYou).length)
  })

  scenario('returns a single thankYou', async (scenario) => {
    const result = await thankYou({ id: scenario.thankYou.one.id })

    expect(result).toEqual(scenario.thankYou.one)
  })

  scenario('creates a thankYou', async (scenario) => {
    const result = await createThankYou({
      input: {
        message: 'String',
        eventId: scenario.thankYou.two.eventId,
        userId: scenario.thankYou.two.userId,
        toUserId: scenario.thankYou.two.toUserId,
      },
    })

    expect(result.message).toEqual('String')
    expect(result.eventId).toEqual(scenario.thankYou.two.eventId)
    expect(result.userId).toEqual(scenario.thankYou.two.userId)
    expect(result.toUserId).toEqual(scenario.thankYou.two.toUserId)
  })

  scenario('updates a thankYou', async (scenario) => {
    const original = await thankYou({
      id: scenario.thankYou.one.id,
    })
    const result = await updateThankYou({
      id: original.id,
      input: { message: 'String2' },
    })

    expect(result.message).toEqual('String2')
  })

  scenario('deletes a thankYou', async (scenario) => {
    const original = await deleteThankYou({
      id: scenario.thankYou.one.id,
    })
    const result = await thankYou({ id: original.id })

    expect(result).toEqual(null)
  })
})
