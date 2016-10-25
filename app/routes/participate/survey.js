import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import config from 'ember-get-config';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  _experiment: null,
  _session: null,
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),

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
            this.transitionTo('participate.survey.complete');
          }
          this.set('_experiment', experiment);
          session.set('experimentVersion', '');
          session.set('locale', this.controllerFor('participate').get('locale'));
          session.set('studyId', this.controllerFor('participate').get('studyId'));
          session.save().then(() => {
            this.set('_session', session);
            resolve(session);
          });
        });
      }).catch(reject);
    });
  },
  beforeModel(params) {
    this._super(params);

    var locale;
    try {
      locale = this.controllerFor('participate').get('locale');
    } catch (e) {}
    if (!locale) {
      this.transitionTo('participate.login');
    }
    var hasGrantedConsent = this.controllerFor('participate').get('hasGrantedConsent');
    if (!hasGrantedConsent) {
      this.transitionTo('participate.survey.consent');
    }
  },
  activate () {
    let session = this.get('_session');
    // Include session ID in any raven reports that occur during the experiment
    this.get('raven').callRaven('setExtraContext', {
      sessionID: session.id,
      participantID:this.controllerFor('participate').get('participantId'),
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
