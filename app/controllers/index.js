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
  actions: {
    authenticate(attrs) {
      this.get('session')
        .authenticate('authenticator:jam-jwt', attrs)
        .then(() => this.transitionToRoute('participate'));
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
