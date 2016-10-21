import Ember from 'ember';
import Experiment from 'exp-models/models/experiment';
import SessionModel from '../models/session';


export default Experiment.extend({
  _registerSessionModels() {
      // Register the session model defined in ISP
      this._super(...arguments);
      var cId = this.get('sessionCollectionId');
      var container = Ember.getOwner(this);
      container.register(`model:${cId}`, SessionModel.extend());
  }
});
