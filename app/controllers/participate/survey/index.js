import Ember from 'ember';
import ENV from 'isp/config/environment';


export default Ember.Controller.extend({
  model: null,
  session: null,
  frameIndex: Ember.computed(function() {
    var frameIndex = 0;
    if (ENV.continueSession) {
      var session = this.get('session');
      if (session && session.get('frameIndex')) {
        frameIndex = session.get('frameIndex');
      }
    }
    return frameIndex;
  }),
  framePage: Ember.computed(function() {
    var framePage = 0;
    if (ENV.continueSession) {
      var session = this.get('session');
      if (session && session.get('surveyPage')) {
        framePage = session.get('surveyPage');
      }
    }
    return framePage;
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
