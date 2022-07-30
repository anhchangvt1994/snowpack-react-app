import React from 'react'
import { createRoot } from 'react-dom/client'
import App from 'js/App'
// import test from './test'

const app = createRoot(document.getElementById('app'))

app.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
