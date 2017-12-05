import 'jsdom-global/register'
import 'babel-polyfill'
import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import { expect } from 'chai'
configure({ adapter: new Adapter() })

import { DateTime } from 'luxon'
import { Calendar } from '../src/components/calendar'
import { CalendarNav } from '../src/components/calendarNav'
import { generateDaysOfMonth } from '../src/models/calendar'

const selectDate = (year, month) => {
	return DateTime.fromString(`${year}${month}`, 'yyyyM')
}

describe('<Calendar/>', function () {
	it('August should have the right number of days, padding in month', function () {
		const wrapper = mount(<Calendar events={generateDaysOfMonth(selectDate(2017,8))}/>)
		expect(wrapper.find('.Calendar .Day')).to.have.length(31)
		expect(wrapper.find('.Calendar .Tile')).to.have.length(35)
	})

	it('February should have the right number of days in month', function () {
		const wrapper = mount(<Calendar events={generateDaysOfMonth(selectDate(2017,2))}/>)
		expect(wrapper.find('.Calendar .Day')).to.have.length(28)
		expect(wrapper.find('.Calendar .Tile')).to.have.length(35)
	})

	it('should show the right number of days for July', () => {
		const wrapper = mount(<Calendar events={generateDaysOfMonth(selectDate(2017,7))}/>)
		expect(wrapper.find('.Calendar .Day')).to.have.length(31)
		expect(wrapper.find('.Calendar .Tile')).to.have.length(42)
	})

	it('August has events on the correct days', () => {
		const wrapper = mount(<Calendar events={generateDaysOfMonth(selectDate(2017,8))}/>)
		expect(wrapper.find('.Calendar .Day').at(0).text()).to.equal('1Sandy Waxer')
		expect(wrapper.find('.Calendar .Day').at(10).text()).to.equal('11Brighter')
	})
})

describe('<CalendarNav/>', () => {
	it('should show the label for the selected month', function () {
		const wrapper = mount(<CalendarNav data={{ month: "December", year: 2017 }}/>)
		expect(wrapper.find('.NavMonth').text()).to.contain('December 2017')
	})
})
