export const schema = gql`
  type Invite {
    id: Int!
    eventId: Int!
    event: Event!
    userId: Int!
    user: User!
    status: UserStatus!
  }

  enum UserStatus {
    INVITED
    DECLINED
    ACCEPTED
  }

  type Query {
    invites: [Invite!]! @requireAuth
    invite(id: Int!): Invite @requireAuth
    invitesByEvent(eventId: Int!): [Invite!]! @requireAuth
  }

  input CreateInviteInput {
    eventId: Int!
    userId: Int!
    status: UserStatus!
  }

  input UpdateInviteInput {
    eventId: Int
    userId: Int
    status: UserStatus
  }

  type Mutation {
    createInvite(input: CreateInviteInput!): Invite! @requireAuth
    updateInvite(id: Int!, input: UpdateInviteInput!): Invite! @requireAuth
    deleteInvite(id: Int!): Invite! @requireAuth
    emailInvite(inviteId: Int!, userId: Int!): Invite! @requireAuth
  }
`
