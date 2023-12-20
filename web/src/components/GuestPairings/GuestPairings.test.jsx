import { render } from '@redwoodjs/testing/web'

import GuestPairings from './GuestPairings'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GuestPairings', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GuestPairings />)
    }).not.toThrow()
  })
})
