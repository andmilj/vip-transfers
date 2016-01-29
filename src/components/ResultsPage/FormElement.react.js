import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class FormElement extends Component {
  static propTypes = {
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    error: PropTypes.bool,
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'text',
    error: false,
  }

  render() {
    const cl = classNames(this.props.className, {
      'form-error': this.props.error,
    });
    return (
      <div className={cl}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input value={this.props.value}
               onChange={this.props.onChange}
               type={this.props.type} id={this.props.id} />
      </div>
    );
  }
}

export default FormElement;
