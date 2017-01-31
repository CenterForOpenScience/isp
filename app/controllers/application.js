import Ember from 'ember';

export default Ember.Controller.extend({
    i18n: Ember.inject.service(),

    rtlDir: Ember.computed('i18n.locale', function() {
        // Define whether the selected locale is RTL.
        return !!this.get('i18n._locale.rtl') ? 'rtl' : 'ltr';
    })
});
