import { getEventsForMonth } from '../data/events'

const calendarGenerator = () => {
	let days = []
	let getId = () => days.length + 1
	let getDay = (day) => {
		return Object.assign({ id: getId(), events: [] }, day)
	}
	let addDays = (count, useIndex) => {
		for (let i=1; i <= count; i++) {
			days.push(getDay({ day: useIndex ? i : '', disabled: !useIndex }))
		}
		return instance
	}

	let instance = {
		days: () => days,
		pad: (count) => addDays(count, false),
		addCalendarDays: (count) => addDays(count, true),
		addEvents: (events, offset) => {
			events.forEach((event) => {
				days[event.day-1 + offset].events.push(event)
			})
			return instance
		}
	}
	return instance
}

const generateDaysOfMonth = (selectedDate) => {
	let dayOffsets = [-1,1,2,3,4,5,6,0]
	let days = [], offset = dayOffsets[selectedDate.weekday]
	let events = getEventsForMonth(selectedDate)

	let gen = calendarGenerator()
	.pad(offset)
	.addCalendarDays(selectedDate.daysInMonth)
	.addEvents(events, offset)

	let endPadding = 7 - (gen.days().length % 7)
	endPadding = (endPadding === 7) ? 0 : endPadding

	return gen
	.pad(endPadding).days()
}

export { generateDaysOfMonth }
