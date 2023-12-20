import { render } from '@redwoodjs/testing/web'

import OwnerPairings from './OwnerPairings'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OwnerPairings', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OwnerPairings />)
    }).not.toThrow()
  })
})
