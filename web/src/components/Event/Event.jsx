import { Link, routes } from '@redwoodjs/router'

const Event = ({ event }) => {
  return (
    <article>
      <header>
        <h2>
          <Link to={routes.event({ id: event.id })}>{event.name}</Link>
        </h2>
      </header>
      <div>Starts at: {event.date}</div>
    </article>
  )
}

export default Event
