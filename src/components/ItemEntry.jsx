import React, { Component } from 'react'
import moment from 'moment'

export default class ItemEntry extends Component {

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.nextDropDate.format('MMM DD YYYY')}</td>
        <td>{this.props.location}</td>
      </tr>
    )
  }
}
