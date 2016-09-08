import Ember from 'ember';

export default Ember.Controller.extend({
  hasGrantedConsent: false,
  studyId: Ember.computed(function() {
    return Ember.getOwner(this).lookup('controller:participate.login').get('studyId');
  }),
  actions: {
    grantConsent() {
      var surveyController = Ember.getOwner(this).lookup('controller:participate');
      surveyController.set('hasGrantedConsent', this.get('hasGrantedConsent'));
      this.transitionToRoute('participate.survey');
    }
  }
});
