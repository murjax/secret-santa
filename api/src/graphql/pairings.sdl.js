export const schema = gql`
  type Pairing {
    id: Int!
    eventId: Int!
    event: Event!
    santaId: Int!
    santa: User!
    personId: Int!
    person: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    pairings: [Pairing!]! @requireAuth
    pairing(id: Int!): Pairing @requireAuth
    pairingsByEvent(eventId: Int!): [Pairing!]! @requireAuth
    currentUserPairings: [Pairing!]! @requireAuth
    currentUserSantaPairings: [Pairing!]! @requireAuth
    currentUserPersonPairings: [Pairing!]! @requireAuth
  }

  input CreatePairingInput {
    eventId: Int!
    santaId: Int!
    personId: Int!
  }

  input UpdatePairingInput {
    eventId: Int
    santaId: Int
    personId: Int
  }

  type Mutation {
    createPairing(input: CreatePairingInput!): Pairing! @skipAuth
    updatePairing(id: Int!, input: UpdatePairingInput!): Pairing! @requireAuth
    deletePairing(id: Int!): Pairing! @requireAuth
    emailPairing(id: Int!): Pairing! @skipAuth
  }
`
