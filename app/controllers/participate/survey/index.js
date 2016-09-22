import Ember from 'ember';

export default Ember.Controller.extend({
  model: null,
  session: null,
  frameIndex: Ember.computed(function() {
    var session = this.get('session');
    if (session && session.get('frameIndex')) {
      return session.get('frameIndex');
    }
    return 0;
  }),
  framePage: Ember.computed(function() {
    var session = this.get('session');
    if (session && session.get('framePage')) {
      return session.get('framePage');
    }
    return 0;
  }),
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
