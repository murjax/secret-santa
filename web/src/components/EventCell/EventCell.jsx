import Event from 'src/components/Event'

export const QUERY = gql`
  query FindEventQuery($id: Int!) {
    event: event(id: $id) {
      id
      name
      date
      sendReminder
      ownerId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ event }) => {
  return <Event event={event} />
}
