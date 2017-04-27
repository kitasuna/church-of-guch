import React from 'react'
import ItemList from './ItemList.jsx'
import moment from 'moment'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    let dayZero = moment(['2017', '03', '12', '09', '00'])
    let cycleLength = 15
    let now = moment()
    this.state = {
      dayZero: dayZero,
      now: now,
      cycleLength: cycleLength,
      currentDay: now.diff(dayZero, 'days') % cycleLength,
      dropDays: [
        {name: 'Gungnir', dropDay: 3, location: '10-10', nextDropDate: ''},
        {name: 'Gae Bolg', dropDay: 12, location: '8-10', nextDropDate: ''},
        {name: 'Masamune', dropDay: 0, location: '14-10', nextDropDate: ''},
        {name: 'Apollo', dropDay: 0, location: '19-10', nextDropDate: ''},
        {name: 'Asclepius', dropDay: 6, location: '16-10', nextDropDate: ''},
        {name: 'Excalibur', dropDay: 12, location: '18-10', nextDropDate: ''},
        {name: 'Flame of Indra', dropDay: 9, location: '12-2', nextDropDate: ''},
        {name: 'Vajra', dropDay: 6, location: '11-10', nextDropDate: ''},
      ]
    }
  }

  componentWillMount() {
    let dropDerps = this.state.dropDays.map(item => {
        return {name:item.name, location:item.location, dropDay: item.dropDay, nextDropDate: this.getNextDropDay(item.dropDay, this.state.currentDay, this.state.cycleLength)}
    })

    this.setState({
      nextDropDates: dropDerps.sort(this.sortItemsByDropDate)
    })
  }

  sortItemsByDropDate(a, b) {
      if(a.nextDropDate.isAfter(b.nextDropDate)) {
        return 1
      } else if (b.nextDropDate.isAfter(a.nextDropDate)) {
        return -1
      } else {
        return 0
      }
  }

  getNextDropDay(dropDay, currentDay, cycleLength) {

    let day = currentDay
    let loops = 0
    let today = moment()
    while(loops < 2) {
      if(day > cycleLength) {
        day = 0
        loops += 1
      }

      if(dropDay == day) {
        let summed = ((cycleLength * loops) - currentDay) + day
        return today.add(((cycleLength * loops) - currentDay) + day, 'days')
      } else {
        day = day + 1
      }
    }
  }

  render() {
    return (
      <div className='pure-g'>
        <div className="pure-u-1-2">
          <h1>Church of Guch</h1>
        </div>
        <div className="pure-u-1-2">
          <p>
          Today's date: {this.state.now.format('MMM DD YYYY')}<br />
          Today is day { this.state.currentDay } of 15
          </p>
        </div>
        <div className="pure-u-1-2">
        <h2>Job Items</h2>
        <ItemList items={this.state.nextDropDates}/>
        </div>
      </div>
    )
  }
}
