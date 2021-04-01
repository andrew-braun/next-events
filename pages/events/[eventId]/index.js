import { Fragment } from "react"
import { useRouter } from "next/router"
import { getEventById } from "../../../dummy-data"
import EventSummary from "../../../components/events/event-detail/EventSummary/event-summary"
import EventLogistics from "../../../components/events/event-detail/EventLogistics/event-logistics"
import EventContent from "../../../components/events/event-detail/EventContent/event-content"
import ErrorAlert from "../../../components/ui/ErrorAlert/ErrorAlert"
import Button from "../../../components/ui/Button/Button"
import styles from "./single-event.module.css"

function SingleEventPage(props) {
	const event = props.event

	if (!event) {
		return (
			<Fragment>
				<ErrorAlert>Event not found!</ErrorAlert>
				<div className="center">
					<Button link="/events">Back to All Events</Button>
				</div>
			</Fragment>
		)
	}

	const { title, description, location, date, image } = event

	console.log(location)
	return (
		<Fragment>
			<EventSummary title={title} />
			<EventLogistics
				address={location}
				date={date}
				image={image}
				imageAlt={title}
			/>
			<EventContent>
				<p>{description}</p>
			</EventContent>
		</Fragment>
	)
}

async function fetchData() {
	const response = await fetch(
		"https://next-js-course-1-default-rtdb.europe-west1.firebasedatabase.app/events.json"
	)
	const data = await response.json()

	return data
}

export async function getStaticProps(context) {
	const { params } = context
	const eventId = params.eventId

	const data = await fetchData()
	const event = Object.entries(data).find((event) => event.id === eventId)

	if (!event) {
		return { notFound: true }
	}

	return {
		props: {
			loadedEvent: event,
		},
	}
}

export async function getStaticPaths() {
	const data = await fetchData()

	const staticPaths = Object.entries(data).reduce((events, entry) => {
		if (entry.isFeatured) {
			return {
				params: {
					eventId: `/events/${entry.id}`,
				},
			}
		}
		return events
	})

	console.log(staticPaths)

	// for (let key in data) {
	// 	console.log(data[key])
	// 	// const entry = data[key]
	// 	// if (entry.isFeatured) {
	// 	// 	staticPaths.push({
	// 	// 		params: {
	// 	// 			eventId: entry.id,
	// 	// 		},
	// 	// 	})
	// 	// }
	// }

	const test = [{ params: { eventId: "e2" } }]

	return {
		paths: test,
		fallback: true,
	}
}

fetchData()

export default SingleEventPage
