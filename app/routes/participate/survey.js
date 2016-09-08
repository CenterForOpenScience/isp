import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import config from 'ember-get-config';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
    return this.store.find('experiment', config.studyId);
  },
  _getSession(params, experiment) { // jshint ignore: line
    return this.get('currentUser').getCurrentUser().then(([account, profile]) => {
      return account.pastSessionsFor(experiment, profile).then((/* pastSessions */) => {
        // TODO uncomment with https://github.com/CenterForOpenScience/isp/pull/51
        // if (pastSessions.length === 0) {
        return this.store.createRecord(experiment.get('sessionCollectionId'), {
          experimentId: experiment.id,
          profileId: account.get('username') + '.' + account.get('username'),
          completed: false,
          feedback: '',
          hasReadFeedback: '',
          expData: {},
          sequence: []
        });
        //}
        //return pastSessions[0];
      });
    });
  },
  model(params) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this._getExperiment(params).then((experiment) => {
        this._getSession(params, experiment).then((session) => {
          this.set('_experiment', experiment);
          session.set('experimentVersion', '');
          session.set('experimentCondition', this._getCondition(session.get('profileId')));
          session.set('locale', this.controllerFor('participate').get('locale'));
          session.save().then(() => {
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
  setupController(controller, session) {
    this._super(controller, session);

    controller.set('experiment', this.get('_experiment'));
    controller.set('session', session);
    controller.set('pastSessions', []);
  }
});
