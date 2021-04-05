import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import useSWR from "swr"
import { fetchEventsData } from "../../../helpers/apiUtils"
import HeadBlock from "../../../components/HeadBlock/HeadBlock"
import EventsList from "../../../components/events/EventsList/EventsList"
import ResultsTitle from "../../../components/events/ResultsTitle/ResultsTitle"
import ErrorAlert from "../../../components/ui/ErrorAlert/ErrorAlert"
import Button from "../../../components/ui/Button/Button"

function FilteredEventsPage(props) {
	const { events } = props
	const [eventsList, setEventsList] = useState(events)
	const [filteredEvents, setFilteredEvents] = useState([])

	const { data, error } = useSWR(
		"https://next-js-course-1-default-rtdb.europe-west1.firebasedatabase.app/events.json"
	)

	useEffect(() => {
		if (data) {
			const eventsArray = []

			for (let key in data) {
				const event = data[key]
				eventsArray.push(event)
			}

			console.log(eventsArray)
			setEventsList(eventsArray)
		}
	}, [data])

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
				<HeadBlock title="Error" description="Something went wrong!" />
				<ErrorAlert>Invalid date values--please adjust them.</ErrorAlert>
				<div className="center">
					<Button link="/events">Back to All Events</Button>
				</div>
			</Fragment>
		)
	}

	// Fetch filtered events using filter function
	const dateObject = { year: year, month: month }

	useEffect(() => {
		if (eventsList) {
			const filtered = eventsList.filter((event) => {
				const eventDate = new Date(event.date)
				console.log(eventDate.getFullYear())
				return (
					eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
				)
			})
			setFilteredEvents(filtered)
		}
	}, [eventsList])

	// If no events are returned, return error
	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<HeadBlock
					title="No Events Found"
					description="No events found for those dates!"
				/>
				<ErrorAlert>No events found for those dates!</ErrorAlert>
				<div className="center">
					<Button link="/events">Back to All Events</Button>
				</div>
			</Fragment>
		)
	}
	const date = new Date(year, month - 1)

	return (
		<Fragment>
			<HeadBlock
				title={`Next Events - ${month}/${year}`}
				description={`All events for ${month}/${year}`}
			/>
			<ResultsTitle date={date} />
			<EventsList events={filteredEvents} />
		</Fragment>
	)
}

export async function getServerSideProps() {
	const data = await fetchEventsData("featured")

	const eventsArray = []
	for (let key in data) {
		const event = data[key]
		event.id = key
		eventsArray.push(event)
	}

	return { props: { events: eventsArray } }
}

export default FilteredEventsPage
