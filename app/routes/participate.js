import Ember from 'ember';
import WarnOnExitRouteMixin from 'exp-player/mixins/warn-on-exit-route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import ENV from '../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, WarnOnExitRouteMixin, {
  _experiment: null,
  _session: null,
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  _getCondition(profileId) {
    var participantId = profileId.split('.')[1];
    var id = participantId.split('_')[1];
    if (id % 2 === 0) {
      return '7pm';
    }
    return '10am';
  },
  _getExperiment() {
    return this.store.find('experiment', ENV.studyId);
  },
  _getSession(params, experiment) { // jshint ignore: line
    return this.get('currentUser').getCurrentUser().then(([account, profile]) => {
      return account.pastSessionsFor(experiment, profile).then((pastSessions) => {
        if (pastSessions.length === 0) {
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
        return pastSessions[0];
      });
    });
  },
  beforeModel(params) {
    this._super(params);
    var locale = this.controllerFor('index').get('locale');
    if (!locale) {
      this.transitionTo('index');
    }
  },
  model(params) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this._getExperiment(params).then((experiment) => {
        this._getSession(params, experiment).then((session) => {
          if (session.get('completed')) {
            this.transitionTo('complete');
          }
          this.set('_experiment', experiment);
          session.set('experimentVersion', '');
          session.set('experimentCondition', this._getCondition(session.get('profileId')));
          session.set('locale', this.controllerFor('index').get('locale'));
          session.save().then(() => {
            resolve(session);
          });
        });
      }).catch(reject);
    });
  },
  setupController(controller, session) {
    this._super(controller, session);

    controller.set('experiment', this.get('_experiment'));
    controller.set('session', session);
    controller.set('pastSessions', []);
  }
});
