import { DateTime } from 'luxon'

const matchRoute = (pattern) => {
	let route = window.location.pathname
	let result = new RegExp(pattern, 'i').exec(route)
	if (!result || result.length !== 4) {
		//default to current month/year if invalid
		let today = DateTime.local()
		return { year: today.year, month: today.month }
	} else if (result.length === 4) {
		return {
			year: parseInt(result[2],10),
			month: parseInt(result[3] ? result[3] : 1,10)
		}
	}
}

const updateRoute = ({year, month}) => {
	window.history.replaceState({}, null, `/calendar/${year}/${month}`)
}

export { matchRoute, updateRoute }
