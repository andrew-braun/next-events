import { Fragment } from "react"
import { useRouter } from "next/router"
import { getAllEvents } from "../../dummy-data"
import EventsList from "../../components/events/EventsList/EventsList"
import EventsSearch from "../../components/events/EventsSearch/EventsSearch"
import styles from "./events.module.css"
import React from "react"

function EventsPage() {
	const router = useRouter()

	const events = getAllEvents()

	function handleFindEvents(year, month) {
		const fullPath = `/events/${year}/${month}`
		router.push(fullPath)
	}

	return (
		<Fragment>
			<EventsSearch onSearch={handleFindEvents} />
			<EventsList events={events} />
		</Fragment>
	)
}

export default EventsPage
