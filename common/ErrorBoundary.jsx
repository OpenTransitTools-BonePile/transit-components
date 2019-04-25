import React from 'react';
import ReactDOM from 'react-dom';

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error, info) {
    /**
     * error - object containing error message and javascript call stack
     * info - object containing the component stack
     */
    console.log("there were errors: " + error);
    this.setState({caughtError: true});
  }

  unstable_handleError() {
    /** older React 15 error handling method */
    console.log("there was an error in a chile compoent of < ErrorBoundary >");
    this.setState({caughtError: true});
  }


  render() {
    return (
      this.state.caughtError
        ? <div>SORRY: Vehicle Layer Errors</div>
        : this.props.children
    );
  }
}

export default ErrorBoundary;