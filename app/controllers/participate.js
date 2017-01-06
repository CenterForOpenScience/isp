import Ember from 'ember';
import { walkConfigs } from '../utils/locale-utils';

export default Ember.Controller.extend({
    i18n: Ember.inject.service(),

    // Set by login page
    locale: null,

    isRTL: Ember.computed('i18n.locale', function() {
        const locale = this.get('i18n.locale');
        const config = walkConfigs(locale, Ember.getOwner(this)) || {};

        // If no setting defined, default to rtl false (consistent with ember-i18n defaultConfig)
        return !!config.rtl;
    }),

    init() {
        // Services are lazily evaluated; make sure we can observe locale
        this.get('i18n');
    }
});
