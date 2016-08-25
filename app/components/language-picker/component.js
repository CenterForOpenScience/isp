import Ember from 'ember';

import countries from './countries';


export default Ember.Component.extend({
    i18n: Ember.inject.service(),
    countries: countries,
    languages: Ember.computed('countries', function() {
      var langs = [];
      this.get('countries').forEach((country) => {
        country.languages.forEach((lang) => {
          langs.push({
            countryCode: country.code,
            name: lang.name,
            code: lang.code
          });
        });
      });
      langs.sort(function(a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      return langs;
    }),
    onPick: null,
    country: null,
    actions: {
      pickLanguage(language, code) {
        this.get('onPick')(language, code);
        this.set('i18n.locale', code);
      }
    }
});
