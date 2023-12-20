import GuestPairings from 'src/components/GuestPairings'
import OwnerPairings from 'src/components/OwnerPairings'

export const QUERY = gql`
  query CurrentUserEventsQuery {
    currentUserEvents {
      id
      name
      date
      invites {
        id
        name
        email
        status
        user {
          id
        }
      }
      pairings {
        id
        santa {
          name
          email
        }
        person {
          name
          email
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

  export const Empty = () => <GuestPairings />

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ currentUserEvents }) => {
  const currentEvent = currentUserEvents[currentUserEvents.length - 1]

  if (currentEvent) {
    return <OwnerPairings currentEvent={currentEvent} />
  }

  return <GuestPairings />
}
