import Ember from 'ember';
import ENV from 'isp/config/environment';


export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  raven: Ember.inject.service(),
  studyId: null,
  participantId: null,
  namespace: ENV.JAMDB.namespace,
  collection: ENV.JAMDB.collection,
  showLanguageSelector: true,
  selectedLanguage: null,
  locale: null,
  authenticating: false,
  actions: {
    authenticate(attrs) {
      return this.get('session')
        .authenticate('authenticator:jam-jwt', attrs)
        .then(() => {
          var surveyController = Ember.getOwner(this).lookup('controller:participate');
          surveyController.set('studyId', attrs.password);
          surveyController.set('participantId', attrs.username);
          this.transitionToRoute('participate.survey.consent');
        })
        .catch((e) => {
          if (e.status === 404) {
            this.send('toggleInvalidAuth');
            this.set('authenticating', false);
          } else if (e.name === 'TransitionAborted') {
            this.send('toggleInvalidLocale');
            this.get('raven').captureMessage('Locale not selected', {
              status: e.status
            });
          }
        });
    },
    toggleInvalidAuth() {
      this.toggleProperty('invalidAuth');
    },
    toggleInvalidLocale() {
      this.toggleProperty('invalidLocale');
    },
    showLanguageSelector() {
      this.set('showLanguageSelector', true);
    },
    selectLanguage(language, code) {
      this.setProperties({
        showLanguageSelector: false,
        selectedLanguage: language,
        locale: code
      });
      var surveyController = Ember.getOwner(this).lookup('controller:participate');
      surveyController.set('locale', code);
    }
  }
});
