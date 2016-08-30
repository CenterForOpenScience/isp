import Ember from 'ember';

export default Ember.Controller.extend({
  hasGrantedConsent: false,
  actions: {
    grantConsent() {
      var surveyController = Ember.getOwner(this).lookup('controller:participate');
      surveyController.set('hasGrantedConsent', this.get('hasGrantedConsent'));
      this.transitionToRoute('participate.survey');
    }
  }
});
