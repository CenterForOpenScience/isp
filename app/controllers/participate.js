import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
    model: null,
    session: null,
    sessionAccount: service('session-account'),
    store: Ember.inject.service(),
    isDirty: function() {
        // TODO: check the session model to see if it contains unsaved data
        var session = this.get('session');
        return session.get('hasDirtyAttributes');
    },
    actions: {
        saveSession(payload, callback) {
            // Save a provided javascript object to a session object
            var session = this.get('session');
            session.setProperties(payload);
            session.save().then(callback);
            this.set('session', session);
        }
    }
});
