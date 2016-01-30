import React, { PropTypes, Component } from 'react';

class Contact extends Component {
  static displayName = 'Contact';

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  _handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const title = 'Contact';
    this.context.onSetTitle(title);

    return (
      <main className="main" role="main">
        <header className="site-title color">
          <div className="wrap">
            <div className="container">
              <h1>Contact us</h1>
            </div>
          </div>
        </header>

        <div id="map_canvas" className="gmap"></div>

        <div className="wrap">
          <div className="row">

            <div className="full-width content textongrey">
              <h2>Send us a message</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit. All fields are required.</p>
            </div>

            <div className="three-fourth">
              <form name="contactform" id="contactform" onSubmit={this._handleSubmit}>
                <div id="message"></div>
                <div className="f-row">
                  <div className="one-half">
                    <label forHtml="name">Name and surname</label>
                    <input type="text" id="name" />
                  </div>
                  <div className="one-half">
                    <label forHtml="email">Email address</label>
                    <input type="email" id="email" />
                  </div>
                </div>
                <div className="f-row">
                  <div className="full-width">
                    <label forHtml="comments">Message</label>
                    <textarea id="comments"></textarea>
                  </div>
                </div>
                <div className="f-row">
                  <input type="submit" value="Submit" id="submit" name="submit" className="btn color medium right" />
                </div>
              </form>
            </div>

            <aside className="one-fourth sidebar right">
              <div className="widget">
                <h4>Need help booking?</h4>
                <div className="textwidget">
                  <p>Call our customer services team on the number below to speak to one of our advisors who will help you with all of your needs.</p>
                  <p className="contact-data"><span className="ico phone black"></span> +1 555 555 555</p>
                </div>
              </div>

              <div className="widget">
                <h4>Advertisment</h4>
                <a href="#"><img src="http://placehold.it/800x600" alt="" /></a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    );
  }

}

export default Contact;
