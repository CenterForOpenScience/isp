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
        .catch((e) => {
          if (e.status === 404) {
            this.send('toggleInvalidAuth');
          } else if (e.name === 'TransitionAborted') {
            this.send('toggleInvalidLocale');
          }
        });
    },
    toggleInvalidAuth() {
      this.toggleProperty('invalidAuth');
    },
    toggleInvalidLocale() {
      this.toggleProperty('invalidLocale');
    },
    showLanguageModal: function() {
      this.set('showLanguageSelector', true);
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
