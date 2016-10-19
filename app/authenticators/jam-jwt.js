import Ember from 'ember';
import ExpJamJwtAuthenticator from 'exp-models/authenticators/jam-jwt';

export default ExpJamJwtAuthenticator.extend({
  raven: Ember.inject.service(),

  _captureUser(username) {
    this.get('raven').callRaven('setUserContext', { id: username });
  },

  restore(data) {
    return this._super(data).then((res) => {
      this._captureUser(res.id);
      return res;
    });
  },

  authenticate(attrs, token) {
    return this._super(attrs, token).then((res) => {
      this._captureUser(res.id);
      return res;
    });
  }

});
