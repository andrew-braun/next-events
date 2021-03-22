import EventListItem from "../EventListItem/EventListItem"
import "./events-list.module.css"

function EventsList({ events }) {
	const eventsList = events.map((event) => {
		return <EventListItem item={event} />
	})
	return <ul>{eventsList}</ul>
}

export default EventsList
