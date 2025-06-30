import { IoMdArrowBack } from 'react-icons/io'

import styles from './Header.module.scss'

import { useAuth } from '../../../hooks/useAuth'
import Hamburger from '../hamburger/Hamburger'

const Header = ({ backLink }) => {
	const { isAuth } = useAuth()

	return (
		<header className={styles.header}>
			<button onClick={() => {}}>
				<IoMdArrowBack fill='#fff' fontSize={29} />
			</button>
			{/* User Profile */}
			<Hamburger />
		</header>
	)
}

export default Header
