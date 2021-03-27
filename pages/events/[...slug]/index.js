import { useRouter } from "next/router"
import { Fragment } from "react"
import { getFilteredEvents } from "../../../dummy-data"
import EventsList from "../../../components/events/EventsList/EventsList"
import ResultsTitle from "../../../components/events/ResultsTitle/ResultsTitle"
import ErrorAlert from "../../../components/ui/ErrorAlert/ErrorAlert"
import Button from "../../../components/ui/Button/Button"

function FilteredEventsPage(props) {
	// Get filter from dates entered in URL slug
	const router = useRouter()
	const filterData = router.query.slug

	if (!filterData) {
		return <ErrorAlert>Loading...</ErrorAlert>
	}

	const year = Number(filterData[0])
	const month = Number(filterData[1])

	// Check that dates are valid numbers and within date range
	if (
		isNaN(year) ||
		isNaN(month) ||
		year > 2030 ||
		year < 2021 ||
		month < 1 ||
		month > 12
	) {
		return (
			<Fragment>
				<ErrorAlert>Invalid date values--please adjust them.</ErrorAlert>
				<div className="center">
					<Button link="/events">Back to All Events</Button>
				</div>
			</Fragment>
		)
	}

	// Fetch filtered events using filter function
	const dateObject = { year: year, month: month }
	const filteredEvents = getFilteredEvents(dateObject)

	// If no events are returned, return error
	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>No events found for those dates!</ErrorAlert>
				<div className="center">
					<Button link="/events">Back to All Events</Button>
				</div>
			</Fragment>
		)
	}
	const date = new Date(year, month)
	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventsList events={filteredEvents} />
		</Fragment>
	)
}

export default FilteredEventsPage
