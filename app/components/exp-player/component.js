import Ember from 'ember';
import ExpPlayer from 'exp-player/components/exp-player/component';

export default ExpPlayer.extend({
    // Show an early exit modal (return non-empty string), but only with browser default message- don't require translation of custom text.
    messageEarlyExitModal: ' ',

    currentUser: Ember.inject.service(),

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
        }
    }
});
