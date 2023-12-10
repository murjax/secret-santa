export const schema = gql`
  type WishList {
    id: Int!
    name: String!
    url: String!
    siteImage: String!
    siteTitle: String!
    siteDescription: String!
    order: Int
    eventId: Int
    event: Event
    userId: Int!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    wishLists: [WishList!]! @requireAuth
    wishListsByUser(userId: Int!): [WishList!] @requireAuth
    wishList(id: Int!): WishList @requireAuth
  }

  input CreateWishListInput {
    name: String!
    url: String!
    siteImage: String
    siteTitle: String
    siteDescription: String
    order: Int
    eventId: Int
    userId: Int
  }

  input UpdateWishListInput {
    name: String
    url: String
    siteImage: String
    siteTitle: String
    siteDescription: String
    order: Int
    eventId: Int
    userId: Int
  }

  type Mutation {
    createWishList(input: CreateWishListInput!): WishList! @requireAuth
    updateWishList(id: Int!, input: UpdateWishListInput!): WishList!
      @requireAuth
    deleteWishList(id: Int!): WishList! @requireAuth
  }
`
