import Head from "next/head"
import styles from "../styles/Home.module.css"

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Next Events</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<h1 className={styles.title}>Next Events</h1>
			</header>

			<main className={styles.main}>
				<ul className={styles.grid}>
					<li className={styles.card}>Event 1</li>
					<li className={styles.card}>Event 2</li>
				</ul>
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
