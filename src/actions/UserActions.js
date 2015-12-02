import _ from 'lodash';
import $ from 'jquery';
import Dispatcher from '../core/Dispatcher';

const UserActions = {

  authenticateUser (username, password) {
    $.post('/api/auth/create', {username, password})
      .done((res) => {
        console.log(res);
      }).fail(({responseJSON}) => {
        const errors = _.isArray(responseJSON) ? responseJSON : [responseJSON];

        // Dispatch errors
        // Dispatcher.dispatch({
        //   type: ,
        //   errors
        // });
        errors.forEach((error) => {
          console.log(error);
        });
      });
  },

  unauthenticateUser () {
    console.log('UNAUTHENTICATE!!!');
  }

};

export default UserActions;
