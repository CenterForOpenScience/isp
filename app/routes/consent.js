import Ember from 'ember';

export default Ember.Route.extend({
  termsAccepted: false,
  actions: {
    submit() {
      this.transitionTo('survey');
    }
  }
});
