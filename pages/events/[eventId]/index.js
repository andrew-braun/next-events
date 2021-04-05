import { Fragment } from "react"
import { fetchEventsData } from "../../../helpers/apiUtils"
import HeadBlock from "../../../components/HeadBlock/HeadBlock"
import EventSummary from "../../../components/events/event-detail/EventSummary/event-summary"
import EventLogistics from "../../../components/events/event-detail/EventLogistics/event-logistics"
import EventContent from "../../../components/events/event-detail/EventContent/event-content"
import ErrorAlert from "../../../components/ui/ErrorAlert/ErrorAlert"
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
			<HeadBlock title={title} description={description} />
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

export async function getStaticProps(context) {
	const { params } = context
	const eventId = params.eventId

	const data = await fetchEventsData()
	const event = await data[eventId]

	if (!event) {
		return { notFound: true }
	}

	return {
		props: {
			loadedEvent: event,
		},
		revalidate: 30,
	}
}

export async function getStaticPaths() {
	const data = await fetchEventsData("featured")

	// console.log(Object.entries(data))
	const staticPaths = []

	for (let key in data) {
		const entry = data[key]
		staticPaths.push({
			params: {
				eventId: key,
			},
		})
	}

	return {
		paths: staticPaths,
		fallback: true,
	}
}

export default SingleEventPage
