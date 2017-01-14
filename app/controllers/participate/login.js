import Ember from 'ember';
import ENV from 'isp/config/environment';

import {siteNames} from '../../components/isp-consent-form/consentText';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  i18n: Ember.inject.service(),
  raven: Ember.inject.service(),
  studyId: null,
  participantId: null,
  namespace: ENV.JAMDB.namespace,
  collection: ENV.JAMDB.collection,
  showLanguageSelector: true,
  selectedLanguage: null,
  locale: null,
  authenticating: false,
  errorHeading: Ember.computed(function(){
    return this.get('i18n').t('login.errorHeading').string;
  }),
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
            this.set('authenticating', false);

            if (!siteNames.includes(attrs.password)) {
              // Do not allow user to attempt login if their study ID is not known to the current version of this code.
              //   This is a safety mechanism in case of improperly created accounts. It prevents people from seeing a
              //   blank page in place of a consent form, but users should never see this error. We intentionally only
              //   check this after the user has logged in and verified a real account, to avoid confusing users who
              //   happened to mistype their credentials.
              alert('You have entered an unrecognized study ID. Please contact your study coordinator for more information');
            } else {
              this.transitionToRoute('participate.survey.consent');
            }
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
