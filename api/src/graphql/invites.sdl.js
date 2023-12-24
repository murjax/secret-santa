export const schema = gql`
  type Invite {
    id: Int
    eventId: Int!
    event: Event!
    name: String!
    email: String!
    userId: Int
    user: User
    status: UserStatus!
  }

  enum UserStatus {
    INVITED
    DECLINED
    ACCEPTED
  }

  type Query {
    invites: [Invite!]! @requireAuth
    invite(id: Int!): Invite @skipAuth
    invitesByEvent(eventId: Int!): [Invite!]! @skipAuth
  }

  input CreateInviteInput {
    eventId: Int!
    name: String!
    email: String!
    status: UserStatus!
  }

  input UpdateInviteInput {
    eventId: Int
    userId: Int
    status: UserStatus
  }

  type Mutation {
    createInvite(input: CreateInviteInput!): Invite! @requireAuth
    updateInvite(id: Int!, input: UpdateInviteInput!): Invite! @skipAuth
    deleteInvite(id: Int!): Invite! @requireAuth
    emailInvite(id: Int!): Invite! @requireAuth
    deleteInvitesByEvent(eventId: Int!): Invite @requireAuth
  }
`
