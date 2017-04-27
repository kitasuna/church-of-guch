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
        {name: 'gungnir', dropDay: 3, nextDropDate: ''},
        {name: 'gaebolg', dropDay: 12, nextDropDate: ''},
        {name: 'masamune', dropDay: 0, nextDropDate: ''},
        {name: 'apollo', dropDay: 0, nextDropDate: ''},
        {name: 'asclepius', dropDay: 6, nextDropDate: ''},
        {name: 'excalibur', dropDay: 12, nextDropDate: ''},
        {name: 'flameofindra', dropDay: 9, nextDropDate: ''},
        {name: 'vajra', dropDay: 6, nextDropDate: ''},
      ]
    }
  }

  componentWillMount() {
    let dropDerps = this.state.dropDays.map(item => {
        return {name:item.name, dropDay: item.dropDay, nextDropDate: this.getNextDropDay(item.dropDay, this.state.currentDay, this.state.cycleLength)}
    })

    this.setState({
      nextDropDates: dropDerps.sort(this.sortItemsByDropDate)
    }, function(){console.dir(this.state)})
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
    console.log('dropDay: '+ dropDay + ', currentDay: ' + currentDay + ', cycleLength: ' + cycleLength)
    console.log(today.format('MMM DD YYYY'))
    while(loops < 2) {
      if(day > cycleLength) {
        day = 0
        loops += 1
      }

      if(dropDay == day) {
        let summed = ((cycleLength * loops) - currentDay) + day
        console.log('multiplier of loops=' + loops)
        console.log('adding ' + summed + ' days')
        return today.add(((cycleLength * loops) - currentDay) + day, 'days')
      } else {
        day = day + 1
      }
    }
  }

  render() {
    return (
      <div>
        Today's date: {this.state.now.format('MMM DD YYYY')}<br />
        Today is day { this.state.currentDay } of 15
        <h2>Job Items</h2>
        <ItemList items={this.state.nextDropDates}/>
      </div>
    )
  }
}
