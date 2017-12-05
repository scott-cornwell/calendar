import React, { Component } from 'react'
import Tile from './tile'
import './calendar.scss'

class Calendar extends Component {

	renderHeader() {
		let days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
		return days.map((day) => {
			return (<div className="DayHeader" key={day}>{day}</div>)
		})
	}

	renderList(data) {
		return data.map((day) => {
			return (<Tile key={day.id} day={day}/>)
		})
	}

	render() {
		let { events } = this.props
		return (
			<div className="Calendar">
				{ this.renderHeader() }
				{ this.renderList(events) }
			</div>
		)
	}
}

export { Calendar }
