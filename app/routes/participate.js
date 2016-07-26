import Ember from 'ember';
import ExpPlayerRouteMixin from 'exp-player/mixins/exp-player-route';
import WarnOnExitRouteMixin from 'exp-player/mixins/warn-on-exit-route';


export default Ember.Route.extend(ExpPlayerRouteMixin, WarnOnExitRouteMixin, {
  store: Ember.inject.service(),

  _getExperiment() {
    return this.store.find('experiment', '578937f93de08a003bf381ad');
  },
  model() {
    return this._super();
  }
});
