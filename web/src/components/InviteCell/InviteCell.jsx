import Invite from 'src/components/Invite'

export const QUERY = gql`
  query FindInviteQuery($id: Int!) {
    invite: invite(id: $id) {
      id
      status
      name
      email
      event {
        id
        name
        date
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ invite }) => {
  return <Invite invite={invite} />
}
