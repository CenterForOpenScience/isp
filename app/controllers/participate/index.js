import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  model: null,
  session: null,
  store: Ember.inject.service(),
  isDirty: function() {
      // TODO: check the session model to see if it contains unsaved data
      var session = this.get('session');
      return session.get('hasDirtyAttributes');
  },
  actions: {
    saveSession(session) {
      this.set('session', session);
      this.get('session').save();
    }
  }
});
