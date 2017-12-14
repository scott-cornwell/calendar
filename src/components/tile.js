import React, { Component } from 'react';
import './tile.scss'

class Tile extends Component {

	renderEvents = (day) => {
		return day.events.map((event) => {
			return (<div key={event.id} alt={event.title} className="Event">
				{event.title}
			</div>)
		})
	}

	render() {
		let { day } = this.props
		return (
			<div className={`Tile ${day.disabled ? '' : 'Day' }`}>
				<span className="DayLabel">{day.day}</span>
				{day.events && this.renderEvents(day)}
			</div>
		);
	}
}

export default Tile;
