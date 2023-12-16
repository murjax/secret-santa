import { render } from '@redwoodjs/testing/web'

import NewThankYouPage from './NewThankYouPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewThankYouPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewThankYouPage />)
    }).not.toThrow()
  })
})
