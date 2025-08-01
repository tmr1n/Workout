import cn from 'clsx'

import styles from './layout.module.scss'

import Header from './header/Header'

//snippet - тут есть какой-то снипет ?
const Layout = ({ children, bgImage, heading = '', backLink = '/' }) => {
	return (
		<section
			className={cn(styles.wrapper, { [styles.otherPage]: !!heading })}
			style={{ backgroundImage: `url(${bgImage})` }}
		>
			<Header backLink={backLink} />

			{heading && <h1 className={styles.heading}>{heading}</h1>}
			{children && <div>{children}</div>}
		</section>
	)
}

export default Layout

//video 5 12:11
