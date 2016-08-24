import Ember from 'ember';
import WarnOnExitRouteMixin from 'exp-player/mixins/warn-on-exit-route';


export default Ember.Route.extend(WarnOnExitRouteMixin, {
  _experiment: null,
  _session: null,
  store: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  _getExperiment() {
    return this.store.find('experiment', '57bc8b1a3de08a003fb1518d');
  },
  _getSession(params, experiment) { // jshint ignore: line
    var _this = this;
    return _this.get('currentUser').getCurrentUser().then(([account, profile]) => {
      return account.pastSessionsFor(experiment, profile).then(function(pastSessions) {
        if (pastSessions.length === 0) {
          return _this.store.createRecord(experiment.get('sessionCollectionId'), {
            experimentId: experiment.id,
            profileId: account.get('username') + '.test',
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
  model(params) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this._getExperiment(params).then((experiment) => {
        this._getSession(params, experiment).then((session) => {
          this.set('_experiment', experiment);
          session.set('experimentVersion', '');
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
