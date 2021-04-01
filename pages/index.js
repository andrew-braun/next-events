import Head from "next/head"
import { getFeaturedEvents } from "../dummy-data"
import EventsList from "../components/events/EventsList/EventsList"
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
			<header className={styles.header}>
				<h1 className={styles.title}>Next Events</h1>
			</header>

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
	const response = await fetch(
		"https://next-js-course-1-default-rtdb.europe-west1.firebasedatabase.app/events.json"
	)
	const data = await response.json()

	const eventsArray = []

	for (let key in data) {
		const event = data[key]
		const { title, description, location, date, image, isFeatured } = event

		if (isFeatured) {
			eventsArray.push({
				id: key,
				title: title,
				description: description,
				location: location,
				date: date,
				image: image,
				isFeatured: isFeatured,
			})
		}
	}
	console.log(eventsArray)
	return { props: { events: eventsArray }, revalidate: 30 }
}