import Ember from 'ember';

export default Ember.Controller.extend({
  studyId: Ember.computed(function() {
    return Ember.getOwner(this).lookup('controller:participate').get('studyId');
  }),
  actions: {
    grantConsent(hasGrantedConsent) {
      var surveyController = Ember.getOwner(this).lookup('controller:participate');
      surveyController.set('hasGrantedConsent', hasGrantedConsent);
      this.transitionToRoute('participate.survey');
    }
  }
});
