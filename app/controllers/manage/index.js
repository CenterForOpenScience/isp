import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),

    // Should only get evaluated when user is logged in
    currentUserId: Ember.computed(function() {
        // TODO: Improve session or currentUser service to make user ID more readily accessible
        return this.get('session.data.authenticated.id');
    }),

    actions: {
        invalidateSession: function () {
            this.get('session').invalidate().then(() => {
                window.location.reload(true);
            });
        }
    }
});
