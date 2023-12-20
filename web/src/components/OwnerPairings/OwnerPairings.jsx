import { useEffect, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import moment from 'moment'

import { useMutation } from '@redwoodjs/web'

const CREATE_PAIRING = gql`
  mutation CreatePairingMutation($input: CreatePairingInput!) {
    createPairing(input: $input) {
      id
    }
  }
`

export const PAIRINGS_BY_EVENT_QUERY = gql`
  query GetPairingsByEventQuery($eventId: Int!) {
    pairings: pairingsByEvent(eventId: $eventId) {
      id
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
`

const OwnerPairings = ({ currentEvent }) => {
  const [acceptedInvites, setAcceptedInvites] = useState([])
  const [pendingInvites, setPendingInvites] = useState([])
  const [declinedInvites, setDeclinedInvites] = useState([])
  const [showPendingInvites, setShowPendingInvites] = useState(false)
  const [showDeclinedInvites, setShowDeclinedInvites] = useState(false)
  const [pairings, setPairings] = useState([])

  const [createPairing] = useMutation(CREATE_PAIRING)
  const [getPairingsByEventId] = useLazyQuery(PAIRINGS_BY_EVENT_QUERY)

  useEffect(() => {
    setAcceptedInvites(
      currentEvent.invites.filter((invite) => invite.status == 'ACCEPTED')
    )
    setPendingInvites(
      currentEvent.invites.filter((invite) => invite.status == 'INVITED')
    )
    setDeclinedInvites(
      currentEvent.invites.filter((invite) => invite.status == 'DECLINED')
    )
  }, [currentEvent.invites])

  useEffect(() => {
    setPairings(currentEvent.pairings)
  }, [currentEvent.pairings])

  useEffect(() => {
    if (acceptedInvites.length > 0 && pairings.length == 0) {
      const pairableInvites = acceptedInvites.slice(0)
      shuffleArray(pairableInvites)
      const pairedInvites = groupIntoSets(pairableInvites, 2)
      createPairings(pairedInvites)
    }
  }, [acceptedInvites, pairings])

  const createPairings = async (pairedInvites) => {
    const promises = pairedInvites.map((item) => {
      return createPairing({
        variables: {
          input: {
            eventId: currentEvent.id,
            santaId: item[0].user.id,
            personId: item[1].user.id,
          },
        },
      })
    })
    await Promise.all(promises)

    const result = await getPairingsByEventId({
      variables: { eventId: currentEvent.id },
    })
    setPairings(result.data.pairings)
  }

  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  const groupIntoSets = (array, setSize) => {
    const result = []

    for (let i = 0; i < array.length; i += setSize) {
      result.push(array.slice(i, i + setSize))
    }

    return result
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

  const timeDiff = calculateWeeksAndDays(currentEvent.date)

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
              <div className="bg-white p-4 m-2">
                <div className="inline-block align-middle px-6 py-1 w-60">
                  <p className="text-2xl font-bold">{pairing.santa.name}</p>
                  <p>{pairing.santa.email}</p>
                </div>
              </div>
              <div className="font-6xl text-supernova font-bold">---</div>
              <div className="bg-white p-4 m-2">
                <div className="inline-block align-middle px-6 py-1 w-60">
                  <p className="text-2xl font-bold">{pairing.person.name}</p>
                  <p>{pairing.person.email}</p>
                </div>
              </div>
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

export default OwnerPairings
