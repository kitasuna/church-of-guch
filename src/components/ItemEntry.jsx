import React, { Component } from 'react'
import moment from 'moment'

export default class ItemEntry extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{moment().format('MMM DD YYYY') === this.props.nextDropDate.format('MMM DD YYYY') ? 'Today' : this.props.nextDropDate.format('MMM Do YYYY')}</td>
        <td>{this.props.location}</td>
      </tr>
    )
  }
}
