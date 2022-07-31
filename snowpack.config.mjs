import { readdirSync, statSync } from 'fs'
import path from 'path'
import ImportMeta from './env/env.js'

/** @type {import("snowpack").SnowpackUserConfig } */
const SnowpackConfig = () => {
	return {
		alias: {
			js: './src',
		},
		mount: generateMountConfig({
			default: {
				src: '/dist',
				public: {
					url: '/',
					static: true,
					resolve: false,
				},
			},
			deep: {
				assets: {
					url: '/dist',
					static: true,
					resolve: false,
				},
			},
		}),
		env: ImportMeta.env,
		plugins: [
			'@snowpack/plugin-react-refresh',
			[
				'@snowpack/plugin-typescript',
				{
					/* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
					...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
				},
			],
		],
		routes: [
			/* Enable an SPA Fallback in development: */
			// {"match": "routes", "src": ".*", "dest": "/index.html"},
		],
		optimize: {
			bundle: true,
			minify: true,
			target: 'es2018',
			treeshake: true,
		},
		packageOptions: {
			/* ... */
		},
		devOptions: {
			open: 'none',
		},
		buildOptions: {
			/* ... */
		},
	}
}

const generateMountConfig = (objParams) => {
	const tmpMountConfiguration = {}
	let tmpCurConfig = null

	if (
		typeof objParams.deep === 'object' &&
		JSON.stringify(objParams.deep) !== '{}'
	) {
		const getDirectories = (directory) => {
			if (tmpMountConfiguration[directory]) {
				return
			}

			return readdirSync(directory)
				.map((file) => path.join(directory, file))
				.filter((path) => statSync(path).isDirectory())
		}

		const recursive = (directory) => {
			getDirectories(directory).map(recursive)

			tmpMountConfiguration[directory] = tmpCurConfig
		} // recursive()

		for (const key in objParams.deep) {
			tmpCurConfig = objParams.deep[key]
			recursive(key)
		}
	} // getDirectories()

	return {
		...tmpMountConfiguration,
		...objParams.default,
	}
} // generateMountConfig()

export default SnowpackConfig()
