import Head from "next/head"
import { getFeaturedEvents } from "../dummy-data"
import EventsList from "../components/events/EventsList/EventsList"
import styles from "./Home.module.css"

export default function Home() {
	const featuredEvents = getFeaturedEvents()

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
