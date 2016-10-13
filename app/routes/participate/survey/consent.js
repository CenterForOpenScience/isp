import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'isp/config/environment';


export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model() {
        var session = this.modelFor('participate.survey');
        // If participant has previously visited the survey (which requires granting consent),
        // go directly to survey and skip consent page
        if (ENV.featureFlags.continueSession) {
            var frameIndex = session.get('frameIndex');
            if (frameIndex && frameIndex >= 0) {
                this.transitionTo('participate.survey');
            }
        }
        return session;
    }
});
