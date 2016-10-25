import Ember from 'ember';

export default Ember.Controller.extend({
  session: null,
  studyId: Ember.computed(function() {
    return Ember.getOwner(this).lookup('controller:participate').get('studyId');
  }),
  actions: {
    grantConsent(hasGrantedConsent) {
      var session = this.get('session');
      session.set('hasGrantedConsent', hasGrantedConsent);
      session.save();
      this.transitionToRoute('participate.survey');
    }
  }
});
