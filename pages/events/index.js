import { Fragment } from "react"
import { useRouter } from "next/router"
import { fetchEventsData } from "../../helpers/apiUtils"
import EventsList from "../../components/events/EventsList/EventsList"
import EventsSearch from "../../components/events/EventsSearch/EventsSearch"
import styles from "./events.module.css"
import React from "react"

function EventsPage(props) {
	const router = useRouter()

	const events = props.events

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

export async function getStaticProps() {
	const data = await fetchEventsData()

	const eventsArray = []

	for (let key in data) {
		eventsArray.push(data[key])
	}

	console.log(data)
	return { props: { events: eventsArray }, revalidate: 900 }
}

export default EventsPage
