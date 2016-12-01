// A route intended for site administrators to get basic information about who completed the study
// Long term this may be moved inside the admin app; for now we will isolate it into ISP to simplify permissions issues.

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    queryParams: {
        siteId: {
            refreshModel: true
        }
    },

    model(params) {
        const query = {};
        if (params.siteId) {
            query['filter[extra.studyId]'] = params.siteId;
        }
        return this.store.queryEverything('account', query);
    }
});
