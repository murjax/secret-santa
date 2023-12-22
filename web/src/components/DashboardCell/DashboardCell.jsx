import { useEffect, useState } from 'react'

import moment from 'moment'

import { Link, navigate, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query CurrentUserEventsQuery {
    currentUserEvents {
      id
      name
      date
      owner {
        id
        name
        avatar
      }
      invites {
        id
        name
        email
        status
        user {
          id
          avatar
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ currentUserEvents }) => {
  const [statusFilter, setStatusFilter] = useState(null)
  const [filteredInvites, setFilteredInvites] = useState([])
  const [showMenu, setShowMenu] = useState(false)

  const currentEvent = currentUserEvents[currentUserEvents.length - 1]

  useEffect(() => {
    const startDate = moment(currentEvent.date)
    const endDate = moment()
    const duration = moment.duration(startDate.diff(endDate))
    const days = duration.days()

    if (days < 0) {
      navigate(routes.newEvent({ eventPassed: true }))
    }
  }, [currentEvent.date])

  useEffect(() => {
    if (statusFilter) {
      const invites = currentEvent.invites.filter(
        (invite) => invite.status == statusFilter
      )
      setFilteredInvites(invites)
    } else {
      setFilteredInvites(currentEvent.invites)
    }
  }, [statusFilter, currentEvent.invites])

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

  const avatarIcon = (invite) => {
    if (!invite.user?.avatar) {
      return statusIcon(invite)
    }

    let colorClass = ''

    switch (invite.status) {
      case 'INVITED':
        colorClass = 'bg-supernova'
        break
      case 'ACCEPTED':
        colorClass = 'bg-spanishGreen'
        break
      case 'DECLINED':
        colorClass = 'bg-orangeRed'
        break
    }

    return (
      <div className="relative inline-block align-middle rounded-full border-4 border-white -ml-6">
        <img
          src={invite.user.avatar}
          alt="avatar"
          width="80px"
          height="80px"
          className="relative inline-block rounded-full"
        />
        <div className={`relative inline-block align-middle rounded-full border-4 border-white p-4 -mb-6 -ml-8 ${colorClass}`}></div>
      </div>
    )
  }

  const statusIcon = (invite) => {
    switch (invite.status) {
      case 'INVITED':
        return pendingIcon()
      case 'ACCEPTED':
        return acceptedIcon()
      case 'DECLINED':
        return declinedIcon()
    }
  }

  const pendingIcon = () => {
    return (
      <div className="relative inline-block align-middle bg-supernova rounded-full border-4 border-white p-4 -ml-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </div>
    )
  }

  const acceptedIcon = () => {
    return (
      <div className="relative inline-block align-middle bg-spanishGreen rounded-full border-4 border-white p-4 -ml-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
    )
  }

  const declinedIcon = () => {
    return (
      <div className="relative inline-block align-middle bg-orangeRed rounded-full border-4 border-white p-4 -ml-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </div>
    )
  }

  const declinedFilterClass = () => {
    const baseClass =
      'text-3xl text-white font-handwriting bg-orangeRed p-4 border-4 border-white'
    const otherFilterSelected = statusFilter && statusFilter != 'DECLINED'
    return otherFilterSelected ? `${baseClass} opacity-50` : baseClass
  }

  const pendingFilterClass = () => {
    const baseClass =
      'text-3xl text-white font-handwriting bg-supernova p-4 border-4 border-white'
    const otherFilterSelected = statusFilter && statusFilter != 'INVITED'
    return otherFilterSelected ? `${baseClass} opacity-50` : baseClass
  }

  const acceptedFilterClass = () => {
    const baseClass =
      'text-3xl text-white font-handwriting bg-spanishGreen p-4 border-4 border-white'
    const otherFilterSelected = statusFilter && statusFilter != 'ACCEPTED'
    return otherFilterSelected ? `${baseClass} opacity-50` : baseClass
  }

  const menuButton = () => {
    return (
      <button
        className="absolute bg-supernova top-5 left-5 cursor-pointer"
        onClick={() => setShowMenu(true)}
      >
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 18L20 18"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 12L20 12"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 6L20 6"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    )
  }

  const profileInfo = () => {
    return (
      <div className="flex absolute top-5 right-5 cursor-pointer">
        <img
          src={currentEvent.owner.avatar}
          alt="avatar"
          width="50px"
          height="50px"
          className="rounded-full"
        />
        <div className="ml-2">
          <p className="text-sm">Logged in as</p>
          <p className="font-bold">{currentEvent.owner.name}</p>
        </div>
      </div>
    )
  }

  const sideMenu = () => {
    if (!showMenu) {
      return
    }

    return (
      <div className="absolute top-0 bottom-0 left-0 right-2/3 bg-supernova">
        <button className="text-5xl p-5" onClick={() => setShowMenu(false)}>
          X
        </button>
        <div>
          <div className="text-5xl p-5">
            <p className="p-2">DASHBOARD</p>
            <Link
              to={routes.event({ id: currentEvent.id })}
              className="block p-2"
            >
              OUR EVENT
            </Link>
            <Link to={routes.editWishList()} className="block p-2">
              MY WISH LIST
            </Link>
          </div>
          <div className="px-8 mt-10">
            <h2 className="text-3xl text-spanishGreen">PAST EVENTS</h2>
            {currentUserEvents.map((event) => {
              if (event.id == currentEvent.id) {
                return
              }

              return (
                <div key={event.id}>
                  <p className="text-2xl font-bold mt-2">{event.name}</p>
                  <p className="text-xl">
                    {moment(event.date).format('MMMM Do, YYYY')}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className="pt-20 p-4 w-full">
      {menuButton()}
      {profileInfo()}
      {sideMenu()}
      <div className="text-3xl text-white font-handwriting">
        {timeDiff} UNTIL
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-6xl text-white">
          {currentEvent.name.toUpperCase()}
        </h2>
      </div>
      <div className="flex justify-between w-4/5 mt-6">
        <button
          className={declinedFilterClass()}
          onClick={() => {
            const value = statusFilter == 'DECLINED' ? null : 'DECLINED'
            setStatusFilter(value)
          }}
        >
          DECLINED
        </button>
        <button
          className={pendingFilterClass()}
          onClick={() => {
            const value = statusFilter == 'INVITED' ? null : 'INVITED'
            setStatusFilter(value)
          }}
        >
          PENDING
        </button>
        <div>
          <button
            className={acceptedFilterClass()}
            onClick={() => {
              const value = statusFilter == 'ACCEPTED' ? null : 'ACCEPTED'
              setStatusFilter(value)
            }}
          >
            ACCEPTED
          </button>
        </div>
      </div>
      <div className="flex flex-wrap mt-6 mb-6 max-w-[50rem]">
        {filteredInvites.map((invite) => {
          return (
            <div className="bg-white p-4 m-2" key={invite.id}>
              {avatarIcon(invite)}

              <div className="inline-block align-middle px-6 py-1 w-60">
                <p className="text-2xl font-bold">{invite.name}</p>
                <p>{invite.email}</p>
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}
