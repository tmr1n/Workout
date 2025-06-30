import { useEffect, useRef, useState } from 'react'

export const useOnClickOutside = isInitialValue => {
	const [isShow, setIsShow] = useState(isInitialValue)
	const ref = useRef(null)

	const handleClickOutside = event => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsShow(false)
		}
	}

	useEffect(() => {
		//отслеживаем клик вне элемента
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return { ref, isShow, setIsShow }
}
//При клике на документ - мы фиксируем нашу функцию,и return означает размонтирование. Есть такое понятие в реакт как размонтирование - когда мы идём в другой компонент, то текущий размонтируется и при размонтировании важно отписаться от текущего слушателя с помощью removeEventListener. Т.е как подписание так и отписание от слушателя.

//ToDo - хорошенько прогнать через Chat gpt что это, и с чем это едят.
