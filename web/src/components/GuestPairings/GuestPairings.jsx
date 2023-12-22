import { useEffect, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import moment from 'moment'

import { useQuery } from '@redwoodjs/web'

export const CURRENT_USER_SANTA_QUERY = gql`
  query GetCurrentUserSantaPairingsQuery {
    currentUserSantaPairings {
      id
      eventId
      santaId
    }
  }
`

export const CURRENT_USER_PERSON_QUERY = gql`
  query GetCurrentUserPersonPairingsQuery {
    currentUserPersonPairings {
      id
      eventId
      personId
    }
  }
`

export const EVENT_QUERY = gql`
  query GetEventQuery($eventId: Int!) {
    events: events(eventId: $eventId) {
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
        santa {
          id
          name
          email
          avatar
        }
        person {
          id
          name
          email
          avatar
        }
      }
    }
  }
`
export const FIND_EVENT_QUERY = gql`
  query FindEventQuery($id: Int!) {
    event: event(id: $id) {
      id
      name
      date
      pairings {
        santa {
          id
          name
          email
        }
        person {
          id
          name
          email
        }
      }
    }
  }
`

const GuestPairings = () => {
  const [currentEventId, setCurrentEventId] = useState(null)
  const [currentUserId, setCurrentUserId] = useState(null)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [santaPairing, setSantaPairing] = useState(null)
  const [personPairing, setPersonPairing] = useState(null)
  const [pendingInvites, setPendingInvites] = useState([])
  const [declinedInvites, setDeclinedInvites] = useState([])
  const [showPendingInvites, setShowPendingInvites] = useState(false)
  const [showDeclinedInvites, setShowDeclinedInvites] = useState(false)
  const [pairings, setPairings] = useState([])

  const [getEventById] = useLazyQuery(FIND_EVENT_QUERY)

  useQuery(CURRENT_USER_SANTA_QUERY, {
    onCompleted: (data) => {
      const santaPairings = data.currentUserSantaPairings
      const santaPairing = santaPairings[santaPairings.length - 1] || false
      setSantaPairing(santaPairing)
    },
  })

  useQuery(CURRENT_USER_PERSON_QUERY, {
    onCompleted: (data) => {
      const personPairings = data.currentUserPersonPairings
      const personPairing = personPairings[personPairings.length - 1] || false
      setPersonPairing(personPairing)
    },
  })

  useEffect(() => {
    if ([santaPairing, personPairing].includes(null)) {
      return
    }

    const userId = santaPairing?.santaId || personPairing?.personId
    const eventId = santaPairing?.eventId || personPairing?.eventId

    setCurrentUserId(userId)
    setCurrentEventId(eventId)
  }, [santaPairing, personPairing])

  useEffect(() => {
    if (currentEventId) {
      getCurrentEvent()
    }
  }, [currentEventId])

  useEffect(() => {
    if (!currentEvent?.invites) {
      return
    }

    setPendingInvites(
      currentEvent.invites.filter((invite) => invite.status == 'INVITED')
    )
    setDeclinedInvites(
      currentEvent.invites.filter((invite) => invite.status == 'DECLINED')
    )
  }, [currentEvent?.invites])

  useEffect(() => {
    if (!currentEvent?.pairings) {
      return
    }

    setPairings(currentEvent.pairings)
  }, [currentEvent?.pairings])

  const getCurrentEvent = async () => {
    const result = await getEventById({ variables: { id: currentEventId } })
    setCurrentEvent(result.data.event)
  }

  const calculateWeeksAndDays = (startDate) => {
    if (!startDate) {
      return
    }

    startDate = moment(startDate)
    const endDate = moment()
    const duration = moment.duration(startDate.diff(endDate))
    const weeks = duration.weeks()
    const days = duration.days()

    let result = ''

    if (weeks > 0) {
      result += `${weeks} WEEK${weeks > 1 ? 'S' : ''}`
    }

    if (days > 0) {
      if (result !== '') {
        result += ' & '
      }
      result += `${days} DAY${days > 1 ? 'S' : ''}`
    }

    if (result === '') {
      result = '0 DAYS'
    }

    return result
  }

  const timeDiff = calculateWeeksAndDays(currentEvent?.date)

  const avatarIcon = (avatar) => {
    if (!avatar) {
      return
    }

    return (
      <div className="relative inline-block align-middle rounded-full border-4 border-white -ml-6">
        <img
          src={avatar}
          alt="avatar"
          width="80px"
          height="80px"
          className="relative inline-block rounded-full"
        />
      </div>
    )
  }

  const santaRecord = (pairing) => {
    return (
      <div className="bg-white p-4 m-2">
        {avatarIcon(pairing.santa.avatar)}
        <div className="inline-block align-middle px-6 py-1 w-60">
          <p className="text-2xl font-bold">{pairing.santa.name}</p>
          <p>{pairing.santa.email}</p>
        </div>
      </div>
    )
  }

  const personRecord = (pairing) => {
    if (pairing.santa.id == currentUserId || pairing.person.id == currentUserId) {
      return (
        <div className="bg-white p-4 m-2">
          {avatarIcon(pairing.santa.avatar)}
          <div className="inline-block align-middle px-6 py-1 w-60">
            <p className="text-2xl font-bold">{pairing.person.name}</p>
            <p>{pairing.person.email}</p>
          </div>
        </div>
      )
    }

    return (
      <div className="bg-white p-4 m-2">
        <div className="inline-block align-middle px-6 py-1 w-60">
        </div>
      </div>
    )
  }

  if (!currentEvent) {
    return
  }

  return (
    <article className="pt-20 p-4 w-full">
      <div className="text-3xl text-white font-handwriting">
        {timeDiff} UNTIL
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-6xl text-white">
          {currentEvent.name.toUpperCase()}
        </h2>
      </div>
      <div className="mt-6 mb-6 max-w-[50rem]">
        {pairings.map((pairing) => {
          return (
            <div className="flex flex-wrap items-center" key={pairing.id}>
              {santaRecord(pairing)}
              <div className="font-6xl text-supernova font-bold">---</div>
              {personRecord(pairing)}
            </div>
          )
        })}
      </div>

      <button
        className="block w-full font-3xl text-left text-white font-handwriting border-b-2 border-white cursor"
        onClick={() => setShowPendingInvites(!showPendingInvites)}
      >
        FAILED TO RSVP
      </button>
      {showPendingInvites && (
        <div className="flex flex-wrap mt-6 mb-6 max-w-[50rem]">
          {pendingInvites.map((invite) => {
            return (
              <div className="bg-white p-4 m-2" key={invite.id}>
                <div className="inline-block align-middle px-6 py-1 w-60">
                  <p className="text-2xl font-bold">{invite.name}</p>
                  <p>{invite.email}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <button
        className="block mt-4 w-full font-3xl text-left text-white font-handwriting border-b-2 border-white cursor"
        onClick={() => setShowDeclinedInvites(!showDeclinedInvites)}
      >
        DECLINED TO PARTICIPATE
      </button>
      {showDeclinedInvites && (
        <div className="flex flex-wrap mt-6 mb-6 max-w-[50rem]">
          {declinedInvites.map((invite) => {
            return (
              <div className="bg-white p-4 m-2" key={invite.id}>
                <div className="inline-block align-middle px-6 py-1 w-60">
                  <p className="text-2xl font-bold">{invite.name}</p>
                  <p>{invite.email}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </article>
  )
}

export default GuestPairings
