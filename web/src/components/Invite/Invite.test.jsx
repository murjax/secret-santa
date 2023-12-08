import { render } from '@redwoodjs/testing/web'

import Invite from './Invite'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Invite', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Invite />)
    }).not.toThrow()
  })
})
