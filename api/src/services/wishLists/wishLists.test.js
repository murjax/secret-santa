import {
  wishLists,
  wishList,
  createWishList,
  updateWishList,
  deleteWishList,
} from './wishLists'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('wishLists', () => {
  scenario('returns all wishLists', async (scenario) => {
    const result = await wishLists()

    expect(result.length).toEqual(Object.keys(scenario.wishList).length)
  })

  scenario('returns a single wishList', async (scenario) => {
    const result = await wishList({ id: scenario.wishList.one.id })

    expect(result).toEqual(scenario.wishList.one)
  })

  scenario('creates a wishList', async (scenario) => {
    const result = await createWishList({
      input: {
        name: 'String',
        url: 'String',
        siteImage: 'String',
        siteTitle: 'String',
        SiteDescription: 'String',
        order: 3806740,
        eventId: scenario.wishList.two.eventId,
        userId: scenario.wishList.two.userId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.url).toEqual('String')
    expect(result.siteImage).toEqual('String')
    expect(result.siteTitle).toEqual('String')
    expect(result.SiteDescription).toEqual('String')
    expect(result.order).toEqual(3806740)
    expect(result.eventId).toEqual(scenario.wishList.two.eventId)
    expect(result.userId).toEqual(scenario.wishList.two.userId)
  })

  scenario('updates a wishList', async (scenario) => {
    const original = await wishList({
      id: scenario.wishList.one.id,
    })
    const result = await updateWishList({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a wishList', async (scenario) => {
    const original = await deleteWishList({
      id: scenario.wishList.one.id,
    })
    const result = await wishList({ id: original.id })

    expect(result).toEqual(null)
  })
})
