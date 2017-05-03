import React from 'react'
import ItemList from './ItemList.jsx'
import moment from 'moment'

const MZ_CLOSED = 0
const MZ_OPEN = 1
const MZ_OPEN1 = 2
const MZ_KING = 3

export default class App extends React.Component {
  constructor(props) {
    super(props)
		let dayZero = moment(['2017', '03', '12', '09', '00'])
		let dayZeroMz = moment(['2014', '10', '7'])
		let now = moment()
		let cycleLength = 15
    this.state = {
      dayZero: dayZero,
			dayZeroMz: dayZeroMz,
      now: now,
      cycleLength: cycleLength,
      currentDay: now.diff(dayZero, 'days') % cycleLength,
			currentDayMz: now.diff(dayZeroMz, "days") % 10,
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
    let dropDates = this.state.dropDays.map(item => {
        return {name:item.name, location:item.location, dropDay: item.dropDay, nextDropDate: this.getNextDropDay(item.dropDay, this.state.currentDay, this.state.cycleLength)}
    })

		let lookupTable = []

		for(let i=0;i<10;i++) {
			lookupTable[i] = []
			for(let j=0;j<24;j++) {
				lookupTable[i][j] = MZ_CLOSED
				let rem = (j - (i % 5)) % 6
				if(rem === 0) {
					lookupTable[i][j] = MZ_OPEN
				} else if(rem === 1) {
					lookupTable[i][j] = MZ_OPEN1
				}
			}
		}

		lookupTable[0][9] = MZ_KING
		lookupTable[1][17] = MZ_KING
		lookupTable[2][12] = MZ_KING
		lookupTable[3][7] = MZ_KING
		lookupTable[4][19] = MZ_KING
		lookupTable[5][8] = MZ_KING
		lookupTable[6][10] = MZ_KING
		lookupTable[7][22] = MZ_KING
		lookupTable[8][11] = MZ_KING
		lookupTable[9][17] = MZ_KING
	
		let nextOpen = []
		nextOpen['mz7k'] = moment().add(this.getNextKing(lookupTable, 7, this.state.currentDayMz, this.state.now.hour()), "hours").startOf("hour")
		nextOpen['mz7'] = moment().add(this.getNextOpen(lookupTable, 7, this.state.currentDayMz, this.state.now.hour()), "hours").startOf("hour")
		nextOpen['mz6k'] = moment().add(this.getNextKing(lookupTable, 6, this.state.currentDayMz, this.state.now.hour()), "hours").startOf("hour")
		nextOpen['mz6'] = moment().add(this.getNextOpen(lookupTable, 6, this.state.currentDayMz, this.state.now.hour()), "hours").startOf("hour")

    this.setState({
      nextDropDates: dropDates.sort(this.sortItemsByDropDate),
			nextOpen: nextOpen,
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

	getNextKing(lookupTable, zone, day, hour) {
		let counter = 0
		while(counter < 48) {
			if(hour > 23) {
				hour = 0
				day += 1
				if(day > 9) {
					day = 0
				}
			}

			if(lookupTable[((day + zone - 1) % 10)][hour] === MZ_KING) {
				return counter
			}
			counter++;
			hour++;
		}
		return -1
	}

	getNextOpen(lookupTable, zone, day, hour) {
		let counter = 0
		while(counter < 48) {
			counter++;
			hour++;
			if(hour > 23) {
				hour = 0
				day += 1
				if(day > 9) {
					day = 0
				}
			}

			if(lookupTable[((day + zone - 1) % 10)][hour] === MZ_OPEN) {
				return counter
			}
		}
		return -1
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

      if(dropDay === day) {
        return today.add(((cycleLength * loops) - currentDay) + day, 'days')
      } else {
        day += 1
      }
    }
  }

	friendlyToday(date1, includeTime = false) {
		let dateFormatted = ''
		let now = moment().startOf('hour')
		if(date1.format('MMM DD YYYY') == now.format('MMM DD YYYY')) {
			dateFormatted = 'Today'	
			if(includeTime === true) {
				console.log(date1.startOf('hour'))
				if(date1.isSame(now)) {
					dateFormatted += ', NOW!'
				} else {
					dateFormatted = dateFormatted.concat(date1.format(', HH:mm'))
				}
			}
		} else {
			if(includeTime === true) {
				dateFormatted = date1.format('MMM Do YYYY, HH:mm')
			} else {
				dateFormatted = date1.format('MMM Do YYYY')	
			}
		}

		return dateFormatted
	}

  render() {
    return (
			<div className="outerjsx">
				<div className="pure-g">
					<div className="pure-u-1 pure-u-md-1">
						<h1>Church of Guch</h1>
						{ /* commenting out for now
						<p>
						Today's date: {this.state.now.format('MMM DD YYYY')}<br />
						Today is day { this.state.currentDay } of 15<br />
						Today is MZ day { this.state.currentDayMz } of 10
						</p>
						*/ }
					</div>
				</div>
				<div className="pure-g">
					<div className="pure-u-1 pure-u-md-1-2">
						<h2>Metal Zones</h2>
						<table className="pure-table">
							<thead>
								<tr>
									<th>zone</th>
									<th>next opens</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>mz 7 king</td>
									<td>{ this.friendlyToday(this.state.nextOpen['mz7k'], true) }</td>
								</tr>
								<tr>
									<td>mz 7</td>
									<td>{ this.friendlyToday(this.state.nextOpen['mz7'], true) }</td>
								</tr>
								<tr>
									<td>mz 6 king</td>
									<td>{ this.friendlyToday(this.state.nextOpen['mz6k'], true) }</td>
								</tr>
								<tr>
									<td>mz 6</td>
									<td>{ this.friendlyToday(this.state.nextOpen['mz6'], true) }</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="pure-u-1 pure-u-1-2">
					<h2>Job Items</h2>
					<ItemList items={this.state.nextDropDates}/>
					</div>
				</div>
			</div>
    )
  }
}
