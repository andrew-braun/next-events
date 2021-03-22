import styles from "./event-list-item.module.css"

function EventListItem({ item }) {
	return <li>{item.title}</li>
}

export default EventListItem
