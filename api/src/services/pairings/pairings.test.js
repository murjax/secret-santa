import {
  pairings,
  pairing,
  createPairing,
  updatePairing,
  deletePairing,
} from './pairings'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pairings', () => {
  scenario('returns all pairings', async (scenario) => {
    const result = await pairings()

    expect(result.length).toEqual(Object.keys(scenario.pairing).length)
  })

  scenario('returns a single pairing', async (scenario) => {
    const result = await pairing({ id: scenario.pairing.one.id })

    expect(result).toEqual(scenario.pairing.one)
  })

  scenario('creates a pairing', async (scenario) => {
    const result = await createPairing({
      input: {
        eventId: scenario.pairing.two.eventId,
        santaId: scenario.pairing.two.santaId,
        personId: scenario.pairing.two.personId,
      },
    })

    expect(result.eventId).toEqual(scenario.pairing.two.eventId)
    expect(result.santaId).toEqual(scenario.pairing.two.santaId)
    expect(result.personId).toEqual(scenario.pairing.two.personId)
  })

  scenario('updates a pairing', async (scenario) => {
    const original = await pairing({ id: scenario.pairing.one.id })
    const result = await updatePairing({
      id: original.id,
      input: { eventId: scenario.pairing.two.eventId },
    })

    expect(result.eventId).toEqual(scenario.pairing.two.eventId)
  })

  scenario('deletes a pairing', async (scenario) => {
    const original = await deletePairing({
      id: scenario.pairing.one.id,
    })
    const result = await pairing({ id: original.id })

    expect(result).toEqual(null)
  })
})
