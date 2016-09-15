import Ember from 'ember';

export default Ember.Controller.extend({
  model: null,
  session: null,
  frameIndex: 0,
  framePage: 1,
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
    },
    updateFrameIndex(frameIndex) {
      this.set('frameIndex', frameIndex + 1);
      // reset framePage on frame change
      this.set('framePage', 1);
    },
    updateFramePage(framePage) {
      this.set('framePage', framePage);
    }
  }
});
