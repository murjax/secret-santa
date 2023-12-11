import { render } from '@redwoodjs/testing/web'

import EditWishListPage from './EditWishListPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditWishListPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditWishListPage />)
    }).not.toThrow()
  })
})
