export const schema = gql`
  type User {
    id: Int!
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    name: String
    avatar: String
    createdAt: DateTime!
    updatedAt: DateTime!
    invites: [Invite]
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
    userByEmail(email: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    name: String
    avatar: String
  }

  input UpdateUserInput {
    email: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    name: String
    avatar: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
