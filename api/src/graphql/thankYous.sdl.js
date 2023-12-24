export const schema = gql`
  type ThankYou {
    id: Int
    message: String!
    eventId: Int!
    event: Event!
    userId: Int!
    user: User!
    toUserId: Int!
    toUser: User!
    createdAt: DateTime!
  }

  type Query {
    thankYous: [ThankYou!]! @requireAuth
    thankYou(id: Int!): ThankYou @requireAuth
  }

  input CreateThankYouInput {
    message: String!
    eventId: Int!
    userId: Int!
    toUserId: Int!
  }

  input UpdateThankYouInput {
    message: String
    eventId: Int
    userId: Int
    toUserId: Int
  }

  type Mutation {
    createThankYou(input: CreateThankYouInput!): ThankYou! @requireAuth
    updateThankYou(id: Int!, input: UpdateThankYouInput!): ThankYou!
      @requireAuth
    deleteThankYou(id: Int!): ThankYou! @requireAuth
    deleteThankYousByEvent(eventId: Int!): ThankYou @requireAuth
  }
`
