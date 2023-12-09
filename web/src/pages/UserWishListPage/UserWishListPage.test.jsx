import { render } from '@redwoodjs/testing/web'

import UserWishListPage from './UserWishListPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserWishListPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserWishListPage />)
    }).not.toThrow()
  })
})
