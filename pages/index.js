import Head from "next/head"
import EventsList from "../components/events/EventsList/EventsList"
import { fetchEventsData } from "../helpers/apiUtils"
import styles from "./Home.module.css"

export default function Home(props) {
	// const featuredEvents = getFeaturedEvents()
	const featuredEvents = props.events

	return (
		<div className={styles.container}>
			<Head>
				<title>Next Events</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div className={styles.mainFeed}>
					<EventsList events={featuredEvents} />
				</div>
			</main>

			<footer>
				<footer className={styles.footer}>
					Made with &nbsp;
					<span role="img" aria-label="heart-emoji">
						❤️
					</span>
					&nbsp; by Andrew Braun
				</footer>
			</footer>
		</div>
	)
}

export async function getStaticProps() {
	const data = await fetchEventsData("featured")

	const eventsArray = []
	for (let key in data) {
		const event = data[key]
		event.id = key
		eventsArray.push(event)
	}

	return { props: { events: eventsArray }, revalidate: 1800 }
}
