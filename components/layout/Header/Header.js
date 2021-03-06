import Link from "next/link"

import styles from "./header.module.css"
function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href="/">Next Events</Link>
			</div>
			<nav className={styles.navigation}>
				<ul className={styles.navMenu}>
					<li>
						<Link href="/events">All Events</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
