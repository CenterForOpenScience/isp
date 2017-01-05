import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import config from 'ember-get-config';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    _experiment: null,
    _session: null,

    currentUser: Ember.inject.service(),
    i18n: Ember.inject.service(),
    session: Ember.inject.service(),

    init() {
        // If any request fails due to authentication reasons, kick user to login page
        // Selectively adapted from:
        //  https://github.com/simplabs/ember-simple-auth/blob/1.2.0-beta.1/addon/mixins/application-route-mixin.js#L113
        this.get('session').on('invalidationSucceeded', Ember.run.bind(this, () => {
            // TODO: For some reason, transitionTo fails, silently. Since the user has work in progress, they are
            // prompted before leaving, but at least this prevents them from continuing on when server rejects save
            window.location.replace('');
        }));
    },

    _getExperiment() {
        return this.store.find('experiment', config.studyId);
    },
    _getSession(params, experiment) { // jshint ignore: line
        return this.get('currentUser').getCurrentUser().then(([account, profile]) => {
            return account.pastSessionsFor(experiment, profile).then((pastSessions) => {
                if (pastSessions.get('length') === 0) {
                    return this.store.createRecord(experiment.get('sessionCollectionId'), {
                        experimentId: experiment.id,
                        profileId: account.get('username') + '.' + account.get('username'),
                        completed: false,
                        feedback: '',
                        hasReadFeedback: '',
                        expData: {},
                        sequence: []
                    });
                }
                return pastSessions.objectAt(0);
            });
        });
    },
    model(params) {
        return new Ember.RSVP.Promise((resolve, reject) => {
            this._getExperiment(params).then((experiment) => {
                this._getSession(params, experiment).then((session) => {
                    if (session.get('completed') && config.featureFlags.showStudyCompletedPage) {
                        this.transitionTo('participate.complete');
                    }
                    this.set('_experiment', experiment);
                    session.set('experimentVersion', '');

                    if (!session.get('extra')) {
                        session.set('extra', {});
                    }

                    session.set('extra.locale', this.get('i18n.locale')); // The user's locale
                    session.set('extra.studyId', this.controllerFor('participate').get('studyId')); // The siteID for the location where the study was taken
                    session.save().then(() => {
                        this.set('_session', session);
                        resolve(session);
                    });
                });
            }).catch(reject);
        });
    },
    beforeModel(transition) {
        this._super(transition);

        var locale;
        try {
            locale = this.controllerFor('participate').get('locale');
        } catch (e) {
        }
        if (!locale) {
            this.transitionTo('participate.login');
        } else {
            this.transitionTo('participate.survey.consent');
        }
    },
    activate () {
        let session = this.get('_session');
        // Include session ID in any raven reports that occur during the experiment
        this.get('raven').callRaven('setExtraContext', {
            sessionID: session.id,
            participantID: this.controllerFor('participate').get('participantId'),
            locale: this.controllerFor('participate').get('locale')
        });
        return this._super(...arguments);
    },
    setupController(controller, session) {
        this._super(controller, session);

        controller.set('experiment', this.get('_experiment'));
        controller.set('session', session);
        controller.set('pastSessions', []);
    }
});
