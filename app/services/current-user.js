import Ember from 'ember';

import config from 'ember-get-config';

import CurrentUserService from 'exp-models/services/current-user';

export default CurrentUserService.extend({
    /**
     * The studyID associated with the current user
     * @property studyID
     */
    studyID: null,

    isSensitive: Ember.computed('studyID', function() {
        // Track whether the player contains sensitive content
        // TODO: get arabic site names
        const site = this.get('studyID');
        return config.sensitiveStudies.includes(site);
    }),
});
