import Ember from 'ember';

import countries from './countries';

export default Ember.Component.extend({
    countries: countries,
    languages: Ember.computed('countries', function() {
	var langs = [];
	this.get('countries').forEach((country) => {
	    country.languages.forEach((lang) => {
		langs.push({
		    countryCode: country.code,
		    name: lang
		});
	    });
	});
	return langs;
    }),
    onPick: null,
    country: null,
    actions: {
	pickLanguage(language) {
	    this.get('onPick')(language);
	}
    }
});
