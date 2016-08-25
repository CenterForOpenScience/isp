import Ember from 'ember';
import ENV from 'isp/config/environment';


export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  studyId: null,
  participantId: null,
  namespace: ENV.JAMDB.namespace,
  collection: ENV.JAMDB.collection,
  showLanguageSelector: true,
  selectedLanguage: null,
  locale: null,
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
    selectLanguage(language, code) {
      this.setProperties({
        showLanguageSelector: false,
        selectedLanguage: language,
        locale: code
      });
    }
  }
});
