import Ember from 'ember';
import ENV from 'isp/config/environment';

export default Ember.Component.extend({
  namespace: ENV.JAMDB.namespace,
  collection: ENV.JAMDB.collection,
  participantId: null,
  actions: {
    authenticate() {
      this.get('login')({
        provider: 'self',
        username: this.get('participantId'),
        password: 'password',
        namespace: this.get('namespace'),
        collection: this.get('collection')
      });
    }
  }
});
