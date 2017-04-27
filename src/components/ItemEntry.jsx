import React, { Component } from 'react'
import moment from 'moment'

export default class ItemEntry extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      'name': props.name,
      'nextDropDate': props.nextDropDate.format('MMM DD YYYY')
    }

  }

  render() {
    return (
      <tr>
        <td>{this.state.name}</td>
        <td>{this.state.nextDropDate}</td>
      </tr>
    )
  }
}
