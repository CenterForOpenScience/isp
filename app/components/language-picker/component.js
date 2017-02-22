import Ember from 'ember';
import config from 'ember-get-config';
import countries, {languagesForProduction} from './countries';

export default Ember.Component.extend({
    i18n: Ember.inject.service(),
    countries: countries,
    languages: Ember.computed('countries', 'i18n.locales', function () {
        const {excludeTestLocale} = config.featureFlags;
        const locales = this.get('i18n.locales').toArray();
        const countries = this.get('countries');
        const languages = [];

        for (const locale of locales) {
            // There are three things we can do with a language option:
            // - Show it in the flag picker (decided by whether a translation file exists)
            // - Show it in development, but hide it on a live server (decided by a config option + a premade list of finished languages)
            // - Show it on a live server like staging or production (if the language is in `languagesForProduction`)
            if (excludeTestLocale && !languagesForProduction.includes(locale)) {
                continue;
            }

            for (const country of countries) {
                for (const language of country.languages) {
                    if (language.code.startsWith(locale)) {
                        languages.push({
                            countryCode: country.code,
                            countryName: country.name,
                            name: language.name,
                            code: language.code
                        });

                        break;
                    }
                }
            }
        }

        languages.sort((a, b) => {
            if (a.countryName > b.countryName) {
                return 1;
            }

            if (a.countryName < b.countryName) {
                return -1;
            }

            return 0;
        });

        return languages;
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
