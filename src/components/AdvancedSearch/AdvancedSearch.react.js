import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import SearchRow from './SearchRow.react';

class AdvancedSearch extends Component {
  static propTypes = {
    destinations: PropTypes.array,
  };

  static defaultProps = {
    destinations: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      from: null,
      to: null,
      persons: null,
      date: undefined,
      return: false,
      error: {},
    };
  }
  componentDidMount() {
    const { advancedSearch } = this.refs;
    $(findDOMNode(advancedSearch))
      .find('input[type=radio], input[type=checkbox],input[type=number], select')
      .uniform();
  }

  componentDidUpdate() {
    const { advancedSearch } = this.refs;
    $(findDOMNode(advancedSearch))
      .find('input[type=radio], input[type=checkbox],input[type=number], select')
      .uniform();
  }

  _handleDateChange = (date) => {
    this.setState({ date });
  }

  _handleRadio = (e) => {
    this.setState({
      return: e.target.value === 'return',
    });
  }

  _renderReturnSearchRow() {
    if (!this.state.return) {
      return null;
    }
    return (<SearchRow {...this.props}/>);
  }

  render() {
    return (
      <div className="advanced-search color" ref="advancedSearch" id="booking">
			<div className="wrap">
				<form role="form" action="search-results.html" method="post">
          <SearchRow {...this.props}
                      date={this.state.date}
                      onDateChange={this._handleDateChange}/>
          {this._renderReturnSearchRow()}
					<div className="f-row">
						<div className="form-group spinner">
							<label htmlFor="people">How many people <small>(including children)</small>?</label>
							<input type="number" id="people" min="1" />
						</div>
						<div className="form-group radios">
							<div>
								<input type="radio"
                  name="radio"
                  value="return"
                  onClick={this._handleRadio}
                  checked={this.state.return}/>
								<label htmlFor="return">Return</label>
							</div>
							<div>
								<input type="radio"
                      name="radio"
                      value="oneway"
                      onClick={this._handleRadio}
                      checked={!this.state.return} />
								<label htmlFor="oneway">One way</label>
							</div>
						</div>
						<div className="form-group right">
							<button type="submit" className="btn large black">Find a transfer</button>
						</div>
					</div>
				</form>
			</div>
		</div>
    );
  }
}

export default AdvancedSearch;
