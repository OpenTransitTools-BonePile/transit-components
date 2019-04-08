import React from 'react';

class AllVehicles extends React.Component {
  state = {
    counter: 0
  };

  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({counter: this.state.counter + 1})}
        >
          Increment counter
        </button>
         <p>Count: {this.state.counter}</p>
      </div>
    );
  }
}

export default AllVehicles;
