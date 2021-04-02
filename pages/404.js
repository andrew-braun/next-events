import { Fragment } from "react"
import ErrorAlert from "../components/ui/ErrorAlert/ErrorAlert"
import Button from "../components/ui/Button/Button"
function Custom404() {
	return (
		<Fragment>
			<ErrorAlert>Page not found!</ErrorAlert>
			<div className="center">
				<Button link="/events">Back to All Events</Button>
			</div>
		</Fragment>
	)
}

export default Custom404
