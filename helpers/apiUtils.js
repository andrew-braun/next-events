export async function fetchEventsData(type) {
	let filter = ""

	if (type === "featured") {
		filter = `?orderBy="isFeatured"&equalTo=true&print=pretty`
	}

	const response = await fetch(
		`https://next-js-course-1-default-rtdb.europe-west1.firebasedatabase.app/events.json${filter}`
	)
	const data = await response.json()

	return data
}
