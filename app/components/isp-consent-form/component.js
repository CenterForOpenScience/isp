import Ember from 'ember';
import layout from './template';
import consentText from './consentText';


export default Ember.Component.extend({
    layout: layout,
    studyId: null,
    content: Ember.computed(function() {
      return consentText[this.get('studyId')];
    }),
    hasGrantedConsent: false,
    actions: {
      grantConsent() {
        this.sendAction('grantConsent', this.get('hasGrantedConsent'));
      }
    }
});
