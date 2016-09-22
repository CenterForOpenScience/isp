import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    var session = this.modelFor('participate.survey');
    var frameIndex = session.get('frameIndex');
    // If participant has previously visited the survey (which requires granting consent),
    // go directly to survey and skip consent page
    if (frameIndex && frameIndex >= 0) {
      this.transitionTo('participate.survey');
    }
    return session;
  }
});
