import React, { Component, PropTypes } from 'react';

class Extras extends Component {
  static contextTypes = {
    onStepBack: PropTypes.func.isRequired,
    onStepForward: PropTypes.func.isRequired,
  }

  handleStepBack = (e) => {
    e.preventDefault();
    this.context.onStepBack();
  }

  handleStepForward = (e) => {
    e.preventDefault();
    this.context.onStepForward();
  }

  render() {
    return (
      <div className="actions">
        <button onClick={this.handleStepBack}
          className="btn medium back">Go back
        </button>
        <button onClick={this.handleStepForward}
          className="btn medium color right">Continue
        </button>
      </div>
    );
  }
}

export default Extras;
