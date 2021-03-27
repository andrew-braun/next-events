const ghPages = process.env.DEPLOY_TARGET === "gh-pages"

module.exports = {
	assetPrefix: ghPages ? "/andrew-braun.github.io/" : "", // customize this value
}
