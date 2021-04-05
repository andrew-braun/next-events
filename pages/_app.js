import Head from "next/head"
import Layout from "../components/layout/Layout/Layout"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<title>Next Events</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="A list of NextJS events for learning, socializing, and creating!"
				/>
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
