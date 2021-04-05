import Head from "next/head"

function HeadBlock(props) {
	const { title, description } = props
	return (
		<Head>
			<title>{title}</title>
			<link rel="icon" href="/favicon.ico" />
			<meta name="description" content={description} />
		</Head>
	)
}

export default HeadBlock
