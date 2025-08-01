import { useState } from 'react'

import Layout from '../../layout/Layout'

function Home() {
	const [count, setCount] = useState(0)

	return (
		<Layout>
			<div className='all'></div>
			<div className='Home'>
				<h1>Vite + React</h1>
				<div className='card'>
					<button onClick={() => setCount(count => count + 1)}>
						count is {count}
					</button>
					<p>
						Edit <code>src/Home.jsx</code> and save to test HMR
					</p>
				</div>
				<p className='read-the-docs'>
					Click on the Vite and React logos to learn more
				</p>
			</div>
		</Layout>
	)
}

export default Home
