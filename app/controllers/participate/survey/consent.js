import Ember from 'ember';

export default Ember.Controller.extend({
    i18n: Ember.inject.service(),

    session: null,

    studyId: Ember.computed(function () {
        return Ember.getOwner(this).lookup('controller:participate').get('studyId');
    }),

    rtlDir: Ember.computed('i18n.locale', function() {
        // Define whether the selected locale is RTL.
        return !!this.get('i18n._locale.rtl') ? 'rtl' : 'ltr';
    }),

    actions: {
        grantConsent(hasGrantedConsent) {
            var session = this.get('session');
            session.set('hasGrantedConsent', hasGrantedConsent);
            session.save();
            this.transitionToRoute('participate.survey');
        }
    }
});
