import React, { Component } from 'react';
import { Calendar } from './components/calendar'
import { CalendarNav } from './components/calendarNav'
import { generateDaysOfMonth } from './models/calendar'
import { DateTime } from 'luxon'
import { matchRoute, updateRoute } from './routes/router'
import './App.scss'

class App extends Component {

	componentWillMount() {
		let route = matchRoute('\/?(calendar)\/(.+)\/(.+)?$')
		this.state = route
	}

	prevMonth = () => {
		let { month, year } = this.state
		if (month === 1) {
			this.setState({ year: year - 1, month: 12 })
		} else {
			this.setState({ year: year, month: month - 1 })
		}
	}

	nextMonth = () => {
		let { month, year } = this.state
		if (month === 12) {
			this.setState({ year: year + 1, month: 1 })
		} else {
			this.setState({ year: year, month: month + 1 })
		}
	}

	render() {
		let { year, month } = this.state
		updateRoute({ year, month })

		let selectedDate = DateTime.fromString(`${year}${month}`, 'yyyyM')
		return (
			<div className="App">
				<div className="Layout">
					<div className="NavContainer">
						<CalendarNav
							data={{ month: selectedDate.monthLong, year: year }}
							next={this.nextMonth}
							previous={this.prevMonth}/>
					</div>
					<Calendar events={generateDaysOfMonth(selectedDate)}/>
				</div>
			</div>
		);
	}
}

export default App;
