import React, { Component, PropTypes } from 'react';

class Extras extends Component {
  static contextTypes = {
    onStepBack: PropTypes.func.isRequired,
    onStepForward: PropTypes.func.isRequired,
    lastStep: PropTypes.bool,
  }

  handleStepBack = (e) => {
    e.preventDefault();
    this.context.onStepBack();
  }

  handleStepForward = (e) => {
    e.preventDefault();
    this.context.onStepForward();
  }

  renderButton() {
    if (this.context.lastStep) {
      return (
        <button onClick={this.handleStepForward}
                className="btn medium color right">Confirm
        </button>
      );
    }

    return (
      <button onClick={this.handleStepForward}
              className="btn medium color right">Continue
      </button>
    );
  }

  render() {
    return (
      <div className="actions">
        <button onClick={this.handleStepBack}
          className="btn medium back">Go back
        </button>
        {this.renderButton()}
      </div>
    );
  }
}

export default Extras;
