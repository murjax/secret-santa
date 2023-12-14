import { render } from '@redwoodjs/testing/web'

import PairingsPage from './PairingsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PairingsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PairingsPage />)
    }).not.toThrow()
  })
})
