import Ember from 'ember';
import ENV from 'isp/config/environment';


export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  participantId: null,
  namespace: ENV.JAMDB.namespace,
  collection: ENV.JAMDB.collection,
  showLanguageSelector: true,
  selectedLanguage: null,
  actions: {
    authenticate(attrs) {
      this.get('session')
        .authenticate('authenticator:jam-jwt', attrs)
        .then(() => this.transitionToRoute('participate'))
        .catch(() => this.send('toggleInvalidAuth'));
    },
    toggleInvalidAuth() {
      this.toggleProperty('invalidAuth');
    },
    toggleLanguageSelector() {
      this.toggleProperty('showLanguageSelector');
    },
    selectLanguage(language) {
      this.setProperties({
        showLanguageSelector: false,
        selectedLanguage: language
      });
    }
  }
});
