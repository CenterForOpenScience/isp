import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, session) {
    this._super(controller, session);
    controller.set('experiment', this.controllerFor('participate.survey').get('experiment'));
    controller.set('session', session);
    controller.set('pastSessions', []);
  },
  actions: {
    willTransition(transition) {
      this._super(transition);
      if (transition.targetName === 'participate.survey.results' || transition.targetName === 'exit') {
        return true;
      }

      var frameIndex = this.controllerFor('participate.survey.index').get('frameIndex');
      var framePage = this.controllerFor('participate.survey.index').get('framePage');

      if (frameIndex !== 0) {
        this.replaceWith('participate.survey.index');
        // Disable back button in qsort page 2, and rating-form page 1
        if (!(frameIndex === 2 && framePage === 1) && frameIndex !== 3) {
          this.controllerFor('participate.survey.index').set('frameIndex', frameIndex - 1);
        }
        // Update pages within the rating-form
        if (frameIndex === 3 && framePage !== 0) {
          this.controllerFor('participate.survey.index').set('framePage', framePage - 1);
        }
      }
    }
  }
});
