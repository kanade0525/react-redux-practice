import React, { Component } from 'react';

const App = () => (<Counter/>);

class Counter extends Component {
  constructor(props){
    super(props)
    this.state = {count: 0}
  }

  countUp = () => {
    this.setState({count: this.state.count +1 })
  }

  countDown = () => {
    this.setState({count: this.state.count -1 })
  }

  render(){

    return(
      <>
        <p>count: {this.state.count}</p>
        <button onClick={this.countUp}>+1</button>
        <button onClick={this.countDown}>-1</button>
      </>
    )
  }

}

export default App;
