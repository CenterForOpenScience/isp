import Ember from 'ember';

export default Ember.Controller.extend({
    studyId: null,
    participantId: null,
    showLanguageSelector: true,
    actions: {
	submit ( ) {
	    console.log(this.getProperties('studyId', 'participantId'));
	},
	toggleLanguageSelector() {
	    this.toggleProperty('showLanguageSelector');
	},
	selectLanguage(language) {
	    debugger;	    
	}
    }
});
