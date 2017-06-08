import DS from 'ember-data';

import ExpFrameBase from 'exp-player/components/exp-frame-base/component';

/**
 * Custom version of frame base that allows ISP (but no other platform app) to provide special handling of
 *   400 errors on save
 *
 * This might be useful to the generic platform, but putting it in ISP for the moment lets us reduce QA burden for
 *   turnaround on a critical bug
 */
export default ExpFrameBase.extend({
    toast: Ember.inject.service(),
    i18n: Ember.inject.service(),

    _save() {
        // TODO: Verify that this is never called directly apart from next: ISP will likely break this assumption
        var frameId = `${this.get('frameIndex')}-${this.get('id')}`;
        // When exiting frame, save the data to the base player using the provided saveHandler
        const payload = this.serializeContent();
        return this.attrs.saveHandler(frameId, payload);
    },

    displayError(error) {
        if (error instanceof DS.InvalidError) {
            // Respond to 400 errors by showing error text. Most common reason for a 400 error would be
            const msg = this.get('i18n').t('previousLogin.line2').string;
            this.toast.error(msg);
        } else {
            // If this is not an error we intend to handle, reraise it (we except that adapters will handle 401 and
            //   403 internally by redirecting to the login page)
            throw err;
        }
    },

    actions: {
        save() {
            this._save().catch(err => this.send('displayError', err));
        },

        next() {
            var frameId = `${this.get('frameIndex')}-${this.get('id')}`;
            this.send('setTimeEvent', 'nextFrame');

            // Only advance the form if save succeeded
            this._save()
                .then(() => this.sendAction('next'))
                .catch(err => this.send('displayError', err));
            window.scrollTo(0, 0);
        }
    }

});
