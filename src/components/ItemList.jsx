import React, { Component } from 'react'
import ItemEntry from './ItemEntry.jsx'
import moment from 'moment'

export default class ItemList extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      items: this.buildItemList(this.props.items)

    }
  }

  buildItemList(items) {
    let itemList = []
    items.forEach(function(item) {
      itemList.push(<ItemEntry key={item.name} name={item.name} nextDropDate={item.nextDropDate} />)
    })

    return itemList
  }

  render() {
    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>item name</th>
            <th>next drop date</th>
          </tr>
        </thead>
        <tbody>
        {this.state.items}
        </tbody>
      </table>
    )
  }
}
