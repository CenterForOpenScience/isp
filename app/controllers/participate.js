import Ember from 'ember';

export default Ember.Controller.extend({
    i18n: Ember.inject.service(),

    // Set by login page
    locale: null,

    rtl: Ember.computed('i18n.locale', function() {
        // Big assumption: any RTL locale we include MUST define the config manually! (can't seem to load the ember-18n config)

        const locale = this.get('i18n.locale');
        // TODO undefined check
        const baseLocale = locale.split('-')[0];
        // Ember i18n service doesn't expose config directly, so we fetch it in a manner analogous to `addTranslations`
        // https://github.com/jamesarosen/ember-i18n/issues/375
        // https://github.com/jamesarosen/ember-i18n/blob/a98bdaecebb0cddfa30ef98aacc032f38ac50ae5/addon/utils/add-translations.js#L6
        const key = `locale:${baseLocale}/config`;  // TODO: check base translation code- this only works if locales explicitly define a config
        const config = Ember.getOwner(this)._lookupFactory(key);
        console.log('Found config!', config, config.rtl);
        return config.rtl;
    }),

    init() {
        // Services are lazily evaluated; make sure we can observe locale
        this.get('i18n');
    }
});
