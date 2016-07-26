import Ember from 'ember';
import ENV from 'isp/config/environment';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

import { jwt_decode } from 'ember-cli-jwt-decode';

import moment from 'moment';

const {
    $, RSVP
} = Ember;

export default BaseAuthenticator.extend({
  url: `${ENV.JAMDB.url}/v1/auth`,
  restore(data) {
    let token = JSON.parse(atob(data.token.split('.')[1]));
    if (token.exp > moment().unix()) {
      return RSVP.resolve(data);
    }
    return RSVP.reject(data);
  },
  authenticate(attrs, token) {
    if (token) {
      var payload = jwt_decode(token);
      var accountId = payload.sub.split('-').pop();
      return new Ember.RSVP.Promise(resolve => {
        resolve({
          id: accountId,
          token: token
        });
      });
    }
    return $.ajax({
      method: 'POST',
      url: this.url,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        data: {
          type: 'users',
          attributes: attrs
        }
      })
    }).then(res => res.data.attributes);
  }
});
