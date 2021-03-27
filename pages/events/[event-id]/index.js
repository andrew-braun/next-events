import { Fragment } from "react"
import { useRouter } from "next/router"
import { getEventById } from "../../../dummy-data"
import EventSummary from "../../../components/events/event-detail/EventSummary/event-summary"
import EventLogistics from "../../../components/events/event-detail/EventLogistics/event-logistics"
import EventContent from "../../../components/events/event-detail/EventContent/event-content"
import ErrorAlert from "../../../components/ui/ErrorAlert/ErrorAlert"
import Button from "../../../components/ui/Button/Button"
import styles from "./single-event.module.css"

function SingleEventPage() {
	const router = useRouter()

	const eventId = router.query["event-id"]

	const event = getEventById(eventId)

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

export default SingleEventPage
