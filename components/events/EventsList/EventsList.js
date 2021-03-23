import EventListItem from "../EventListItem/EventListItem"
import styles from "./events-list.module.css"

function EventsList({ events }) {
	const eventsList = events.map((event) => {
		return <EventListItem item={event} key={event.id} />
	})
	return <ul className={styles.list}>{eventsList}</ul>
}

export default EventsList
