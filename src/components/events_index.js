import React, { Component } from 'react';
import { connect } from 'react-redux';

import { readEvents } from '../actions'

class EventsIndex extends Component {
  componentDidMount() {
    this.props.readEvents()
  }
  render(){
    const props = this.props
    return(
      <>
        <p>value: {props.value}</p>
        <button onClick={props.increment}>+1</button>
        <button onClick={props.decrement}>-1</button>
      </>
    )
  }

}
const mapStateToProps = state => ({})
const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
