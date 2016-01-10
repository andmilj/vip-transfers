import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AdvancedSearch extends Component {
  componentDidMount() {
    const {onewayCheckbox, returnCheckbox} = this.refs;
    $([ReactDOM.findDOMNode(onewayCheckbox), ReactDOM.findDOMNode(returnCheckbox)]).uniform();
  }

  render() {
    return (
      <div className="advanced-search color" id="booking">
			<div className="wrap">
				<form role="form" action="search-results.html" method="post">
					<div className="f-row">
						<div className="form-group datepicker one-third">
							<label htmlFor="dep-date">Departure date and time</label>
							<input type="text" id="dep-date" />
						</div>
						<div className="form-group select one-third">
							<label>Pick up location</label>
							<select>
								<option selected>&nbsp;</option>
								<optgroup label="Germany">
									<option value="Berlin Central Train Station">Berlin Central Train Station</option>
									<option value="Berlin Schonefeld Airport">Berlin Schonefeld Airport</option>
									<option value="Berlin Tegel Airport">Berlin Tegel Airport</option>
								</optgroup>
								<optgroup label="United Kingdom">
									<option value="Belfast City Airport">Belfast City Airport</option>
									<option value="Belfast International Airport">Belfast International Airport</option>
									<option value="Bristol Airport">Bristol Airport</option>
								</optgroup>
							</select>
						</div>
						<div className="form-group select one-third">
							<label>Drop off location</label>
              <select>
                <option selected>&nbsp;</option>
                <optgroup label="Germany">
                  <option value="Berlin Central Train Station">Berlin Central Train Station</option>
                  <option value="Berlin Schonefeld Airport">Berlin Schonefeld Airport</option>
                  <option value="Berlin Tegel Airport">Berlin Tegel Airport</option>
                </optgroup>
                <optgroup label="United Kingdom">
                  <option value="Belfast City Airport">Belfast City Airport</option>
                  <option value="Belfast International Airport">Belfast International Airport</option>
                  <option value="Bristol Airport">Bristol Airport</option>
                </optgroup>
              </select>
						</div>
					</div>

					<div className="f-row">
						<div className="form-group datepicker one-third">
							<label htmlFor="ret-date">Return date and time</label>
							<input type="text" id="ret-date" />
						</div>
						<div className="form-group select one-third">
							<label>Pick up location</label>
              <select>
                <option selected>&nbsp;</option>
                <optgroup label="Germany">
                  <option value="Berlin Central Train Station">Berlin Central Train Station</option>
                  <option value="Berlin Schonefeld Airport">Berlin Schonefeld Airport</option>
                  <option value="Berlin Tegel Airport">Berlin Tegel Airport</option>
                </optgroup>
                <optgroup label="United Kingdom">
                  <option value="Belfast City Airport">Belfast City Airport</option>
                  <option value="Belfast International Airport">Belfast International Airport</option>
                  <option value="Bristol Airport">Bristol Airport</option>
                </optgroup>
              </select>
						</div>
						<div className="form-group select one-third">
							<label>Drop off location</label>
              <select>
                <option selected>&nbsp;</option>
                <optgroup label="Germany">
                  <option value="Berlin Central Train Station">Berlin Central Train Station</option>
                  <option value="Berlin Schonefeld Airport">Berlin Schonefeld Airport</option>
                  <option value="Berlin Tegel Airport">Berlin Tegel Airport</option>
                </optgroup>
                <optgroup label="United Kingdom">
                  <option value="Belfast City Airport">Belfast City Airport</option>
                  <option value="Belfast International Airport">Belfast International Airport</option>
                  <option value="Bristol Airport">Bristol Airport</option>
                </optgroup>
              </select>
						</div>
					</div>

					<div className="f-row">
						<div className="form-group spinner">
							<label htmlFor="people">How many people <small>(including children)</small>?</label>
							<input type="number" id="people" min="1" />
						</div>
						<div className="form-group radios">
							<div>
								<input ref="returnCheckbox"
                  type="radio"
                  name="radio"
                  id="return"
                  value="return"
                  onClick={(e) => console.log(e.target.checked)}/>
								<label htmlFor="return">Return</label>
							</div>
							<div>
								<input ref="onewayCheckbox"
                      type="radio"
                      name="radio"
                      id="oneway"
                      value="oneway" checked />
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
