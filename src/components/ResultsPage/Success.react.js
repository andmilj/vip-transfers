import React, { Component } from 'react';
import BookingHelp from './BookingHelp.react';

class Success extends Component {
  render() {
    return (
      <div>
        <header className="site-title color">
          <div className="wrap">
          <div className="container">
            <h1>Confirmation</h1>
            <nav role="navigation" className="breadcrumbs">
              <ul>
                <li><a href="index.html" title="Home">Home</a></li>
                <li>Confirmation</li>
              </ul>
            </nav>
          </div>
          </div>
        </header>
        <div className="wrap">
          <div className="row">
            <div className="three-fourth">
              <div className="content">
                <h2>Your reservation was successfull!</h2>
                <p className="lead">
                  Far far away, behind the word mountains,
                  far from the countries Vokalia and Consonantia,
                  there live the blind texts. Separated they live in Bookmarksgrove
                  right at the coast of the Semantics, a large language ocean. A small
                  river named Duden flows by their place and supplies it with the necessary
                  regelialia.
                </p>
                <p>
                  It is a paradisematic country, in which roasted parts of sentences
                  fly into your mouth. Even the all-powerful Pointing has no control about
                  the blind texts it is an almost unorthographic life One day however
                  a small line of blind text by the name of Lorem Ipsum decided to leave
                  for the far World of Grammar.
                </p>
              </div>
            </div>
            <aside className="sidebar right one-fourth">
              <BookingHelp />
              <div className="widget">
                <h4>Advertisment</h4>
                <a href="#"><img src="http://placehold.it/800x600" alt="" /></a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

export default Success;
