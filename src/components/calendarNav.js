import React, { Component } from 'react'
import './calendarNav.scss'

class CalendarNav extends Component {

	render() {
		let { data, previous, next } = this.props
		return (
			<div className="CalendarNav">
				<div className="NavLeft" onClick={() => previous()}>
					{String.fromCharCode(parseInt(3008,16))}
				</div>
				<div className="NavMonth">
					{data.month} {data.year}
				</div>
				<div className="NavRight" onClick={() => next()}>
					{String.fromCharCode(parseInt(3009,16))}
				</div>
			</div>
		);
	}
}

export { CalendarNav }
