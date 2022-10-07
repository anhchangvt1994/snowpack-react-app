import React, { useState } from 'react'
import './App.css'
import useEffectCustomize from './use-effect-customize'

function App() {
	const [count, setCount] = useState(0)

	const useEffectCounter = new useEffectCustomize([count])

	useEffectCounter.init(() => {
		const timer = setTimeout(() => setCount(count + 1), 1000)
		return () => clearTimeout(timer)
	})

	return (
		<div className="app">
			<header className="app-head">
				<img
					className="app-logo"
					src={import.meta.env.IMAGE_URL + '/logo.svg'}
					alt="React Logo"
				/>
				<p>
					Page has been open for <code>{count}</code> seconds.
				</p>
			</header>
		</div>
	)
} // App()

export default App
