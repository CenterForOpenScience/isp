import Ember from 'ember';
//import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ExpPlayerRouteMixin from 'exp-player/mixins/exp-player-route';
import WarnOnExitRouteMixin from 'exp-player/mixins/warn-on-exit-route';


export default Ember.Route.extend(ExpPlayerRouteMixin, WarnOnExitRouteMixin, {
  store: Ember.inject.service(),

  _getExperiment() {
    return this.store.find('experiment', '578937f93de08a003bf381ad');
  },
  _getSession(params, experiment) { // jshint ignore: line
    return new Ember.RSVP.Promise((resolve, reject) => {
      resolve(this.store.createRecord(experiment.get('sessionCollectionId'), {
        experimentId: experiment.id,
        profileId: 'TESTING',
        completed: false,
        feedback: '',
        hasReadFeedback: '',
        expData: {},
        sequence: []
      }));
    });
  },
  model() {
    return this._super();
  }
});
