import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../Input';
import events from '../utils/events';
import withStyles from '../../../decorators/withStyles';
import styles from './style';

const POSITION = {
  AUTO: 'auto',
  DOWN: 'down',
  UP: 'up',
};

@withStyles(styles)
class Dropdown extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    direction: React.PropTypes.oneOf(['auto', 'up', 'down']),
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    source: React.PropTypes.any,
    value: React.PropTypes.any,
  };

  static defaultProps = {
    className: '',
    direction: 'auto',
    source: {},
  };

  state = {
    direction: this.props.direction,
    focus: false,
    query: this.source().get(this.props.value) || '',
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.focus && nextState.focus && this.props.direction === POSITION.AUTO) {
      const direction = this.calculateDirection();
      if (this.state.direction !== direction) {
        this.setState({ direction });
        return false;
      }
    }
    return true;
  }

  handleChange = (key) => {
    const query = this.source().get(key);

    this.setState({ focus: false, query }, () => {
      this.refs.input.getChild().blur();
      if (this.props.onChange) {
        this.props.onChange(key);
      }
    });
  };

  handleQueryBlur = () => {
    if (this.state.focus) {
      this.setState({focus: false});
    }
  };

  handleQueryChange = (event) => {
    this.setState({query: event.target.value}, () => {
      if (!event.target.value) {
        this.props.onChange(null);
      }
    });
  };

  handleQueryFocus = () => {
    this.refs.suggestions.scrollTop = 0;
    this.setState({active: '', focus: true});
  };

  handleQueryKeyUp = (event) => {
    if (event.which === 13 && this.state.active) {
      this.select(this.state.active, event);
    }

    if (event.which === 27) {
      this.refs.input.getChild().blur();
    }

    if ([40, 38].indexOf(event.which) !== -1) {
      const suggestionsKeys = [...this.suggestions().keys()];
      let index = suggestionsKeys.indexOf(this.state.active) + (event.which === 40 ? +1 : -1);

      if (index < 0) {
        index = suggestionsKeys.length - 1;
      }

      if (index >= suggestionsKeys.length) {
        index = 0;
      }

      this.setState({active: suggestionsKeys[index]});
    }
  };

  handleSuggestionHover = (key) => {
    this.setState({active: key});
  };

  blurMainInput = () => {
    // withStyles HoC is hiding public function of input
    this.refs.input.getChild().blur();
  }

  calculateDirection() {
    if (this.props.direction === 'auto') {
      const client = ReactDOM.findDOMNode(this.refs.input).getBoundingClientRect();
      const screenHeight = window.innerHeight || document.documentElement.offsetHeight;
      // TODO: check next line
      const up = client.top > ((screenHeight / 2) + client.height);

      return up ? 'up' : 'down';
    }

    return this.props.direction;
  }

  suggestions() {
    const suggestions = new Map();
    const values = this.values();
    for (const [key, value] of this.source()) {
      if (!values.has(key)) {
        suggestions.set(key, value);
      }
    }
    return suggestions;
  }

  source() {
    const { source } = this.props;
    if (source.hasOwnProperty('length')) {
      return new Map(source.map(item => [item, item]));
    }

    return new Map(Object.keys(source).map((key) => [key, source[key]]));
  }

  values() {
    const valueMap = new Map();

    for (const [key, value] of this.source()) {
      if (key === this.props.value) {
        valueMap.set(key, value);
      }
    }

    return valueMap;
  }

  select(key, event) {
    events.pauseEvent(event);
    this.handleChange(key);
  }

  renderSuggestions() {
    let suggestionsClassName = 'Dropdown-suggestions';

    if (this.state.direction === 'up') {
      suggestionsClassName += ` Dropdown-up`;
    }

    const suggestions = [...this.suggestions()].map(([key, value]) => {
      let className = 'Dropdown-suggestion';
      if (this.state.active === key) className += ` Dropdown-active`;
      return (
        <li
          key={key}
          className={className}
          onMouseDown={this.select.bind(this, key)}
          onMouseOver={this.handleSuggestionHover.bind(this, key)}
        >
          {value}
        </li>
      );
    });

    return <ul ref="suggestions" className={suggestionsClassName}>{suggestions}</ul>;
  }

  render() {
    let className = 'Dropdown';
    if (this.state.focus) className += ` Dropdown-focus`;
    if (this.props.error) className += ` Dropdown-errored`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div data-react-toolbox="autocomplete" className={className}>
        <Input
          ref="input"
          {...this.props}
          className={'Dropdown-input'}
          onBlur={this.handleQueryBlur}
          onChange={this.handleQueryChange}
          onFocus={this.handleQueryFocus}
          onKeyUp={this.handleQueryKeyUp}
          value={this.state.query}
        />
        { this.renderSuggestions() }
      </div>
    );
  }
}

export default Dropdown;
