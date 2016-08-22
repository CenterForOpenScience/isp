import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, session) {
    this._super(controller, session);
    controller.set('experiment', this.controllerFor('participate').get('experiment'));
    controller.set('session', session);
    controller.set('pastSessions', []);
  }
});
