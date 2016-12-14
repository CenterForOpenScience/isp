import Ember from 'ember';

// Based on ember simple auth AuthenticatedRouteMixin, but modified to support a non-standard login page
export default Ember.Route.extend({
    session: Ember.inject.service(),

    // If user is not logged in, interrupt this request and send to login page. Else don't interfere.
    beforeModel(transition) {
        if (!this.get('session.isAuthenticated')) {
            transition.abort();
            this.set('session.attemptedTransition', transition);
            return this.transitionTo('manage.login');
        }
        return this._super(...arguments);
    }
});
