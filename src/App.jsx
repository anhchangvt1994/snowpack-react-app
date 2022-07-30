import React, { useState, useEffect } from 'react'

function App() {
	const [count, setCount] = useState(0)
	useEffect(() => {
		const timer = setTimeout(() => setCount(count + 1), 500)
		return () => clearTimeout(timer)
	}, [count, setCount])

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
