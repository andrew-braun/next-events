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
	const event = props.loadedEvent

	if (!event) {
		return (
			<Fragment>
				<ErrorAlert>Loading...</ErrorAlert>
			</Fragment>
		)
	}

	const { title, description, location, date, image } = event

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
	const event = await data[eventId]

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

	// console.log(Object.entries(data))
	const staticPaths = []

	for (let key in data) {
		const entry = data[key]
		if (entry.isFeatured) {
			staticPaths.push({
				params: {
					eventId: key,
				},
			})
		}
	}

	console.log(staticPaths)

	const test = [{ params: { eventId: "e1" } }, { params: { eventId: "e2" } }]

	return {
		paths: staticPaths,
		fallback: true,
	}
}

fetchData()

export default SingleEventPage
