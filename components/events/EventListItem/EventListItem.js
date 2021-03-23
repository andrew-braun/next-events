import Button from "../../ui/Button/Button"
import DateIcon from "../../icons/date-icon"
import AddressIcon from "../../icons/address-icon"
import ArrowRightIcon from "../../icons/arrow-right-icon"
import styles from "./event-list-item.module.css"

function EventListItem({ item }) {
	const { id, title, description, location, date, image, isFeatured } = item
	const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		day: "numeric",
	})
	const formattedAddress = location.replace(", ", "\n")
	const exploreLink = `/events/${id}`

	return (
		<li className={styles.item}>
			<img src={`/${image}`} alt={title} />
			<div className={styles.content}>
				<div className={styles.summary}>
					<h2>{title}</h2>
					<div className={styles.date}>
						<DateIcon />
						<time>{humanReadableDate}</time>
					</div>
					<div className={styles.address}>
						<AddressIcon />
						<address>{formattedAddress}</address>
					</div>
				</div>
				<div className={styles.actions}>
					<Button link={exploreLink}>
						<span>Explore Event</span>
						<span className={styles.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	)
}

export default EventListItem
