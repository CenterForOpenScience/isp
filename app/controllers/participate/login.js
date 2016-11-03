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
      if (!this.get('locale')) {
        this.toggleProperty('invalidLocale');
        this.set('authenticating', false);
        this.get('raven').captureMessage('Locale not selected');
      } else {
        return this.get('session')
          .authenticate('authenticator:jam-jwt', attrs)
          .then(() => {
            var surveyController = Ember.getOwner(this).lookup('controller:participate');
            surveyController.set('studyId', attrs.password);
            surveyController.set('participantId', attrs.username);
            this.transitionToRoute('participate.survey.consent');
          })
          .catch((e) => {
            this.set('authenticating', false);
            if (e.status === 404 || e.status === 401) {
              this.toggleProperty('invalidAuth');
            } else {
              this.toggleProperty('loginError');
            }
          });
      }
    },
    toggleAction(property) {
      this.toggleProperty(property);
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
