export const schema = gql`
  type Event {
    id: Int!
    name: String!
    sendReminder: Boolean!
    date: DateTime!
    ownerId: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    invites: [Invite]
    pairings: [Pairing]
  }

  type Query {
    events: [Event!]! @requireAuth
    currentUserEvents: [Event!]! @requireAuth
    event(id: Int!): Event @requireAuth
  }

  input CreateEventInput {
    name: String!
    sendReminder: Boolean!
    date: DateTime!
  }

  input UpdateEventInput {
    name: String
    sendReminder: Boolean
    date: DateTime
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event! @requireAuth
    updateEvent(id: Int!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: Int!): Event! @requireAuth
  }
`
