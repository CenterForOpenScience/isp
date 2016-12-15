import Ember from 'ember';

export default Ember.Route.extend({
    i18n: Ember.inject.service(),

    beforeModel() {
        this.set('i18n.locale', 'en-us');
        return this._super(...arguments);
    }
});
