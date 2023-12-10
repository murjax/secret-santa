import { render } from '@redwoodjs/testing/web'

import NewWishListPage from './NewWishListPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewWishListPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewWishListPage />)
    }).not.toThrow()
  })
})
