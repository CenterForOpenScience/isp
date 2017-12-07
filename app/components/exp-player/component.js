import Ember from 'ember';
import ExpPlayer from 'exp-player/components/exp-player/component';

export default ExpPlayer.extend({
    currentUser: Ember.inject.service(),
    i18n: Ember.inject.service(),

    // Show an early exit modal (return non-empty string), but only with browser default message- don't require translation of custom text.
    messageEarlyExitModal: ' ',

    isRTL: Ember.computed('i18n.locale', function() {
        // Define whether the selected locale is RTL. Make property available to all frames.
        return !!this.get('i18n._locale.rtl');
    }),

    // Additional configuration required for ISP-specific use case
    extra: Ember.computed('isRTL', function() {
        return { isRTL: this.get('isRTL') };
    }),
    init() {
        // Services are lazily evaluated; make sure we can observe locale
        this.get('i18n');
        return this._super(...arguments);
    },

    actions: {
        sessionCompleted() {
            // Mark the current user account as having completed a session, then, also update the session model
            // If this fails to save the account due to normal network issues, it will still update the session but
            // swallow the error
            this.get('session').set('completed', true);

            return this.get('currentUser').getCurrentUser().then(([account]) => {
                // Deal with `extra` field sometimes being undefined
                let dest = account.get('extra') || {};
                dest['hasCompletedStudy'] = true;
                account.set('extra', dest);
                return account.save();
            }).catch( e => console.error('Could not mark account as having completed study:', e));
        },
        saveFrame() {
            return this._super(...arguments).catch((e) => {
                // intercept, tag, and log error
                e.message = 'intercepted: ' + e.message;
                this.get('raven').captureException(e, {tags: {is_intercepted: true}});
                throw e;
            });
        },
    }
});
