import Ember from 'ember';
import ENV from 'isp/config/environment';


export default Ember.Controller.extend({
  model: null,
  session: null,
  frameIndex: ENV.featureFlags.continueSession? Ember.computed.alias('session.frameIndex') : 0,
  framePage: ENV.featureFlags.continueSession? Ember.computed.alias('session.surveyPage') : 0,
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
