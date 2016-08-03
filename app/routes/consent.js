import Ember from 'ember';

export default Ember.Route.extend({
  i18n: Ember.inject.service(),
  termsAccepted: false,
  actions: {
    submit() {
      this.transitionTo('survey');
    }
  }
});
