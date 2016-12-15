import Ember from 'ember';
import ExpJamAuth from 'exp-models/components/jam-auth/component';

export default ExpJamAuth.extend({
    i18n: Ember.inject.service(),

    /**
     * ISP has more than one login form; allow customization of what we call the "user" field
     * @property {String} userLabel The label that goes next to the user ID field' defaults to locale translation
     */
    userLabel: Ember.computed(function() {
        return this.get('i18n').t('login.participantID').string;
    })
});
