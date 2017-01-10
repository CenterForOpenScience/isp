// A route intended for site coordinators to get basic information about who completed the study
// Long term this may be moved inside the admin app; for now we will isolate it into ISP to simplify permissions issues.

import Ember from 'ember';

// TODO: Different auth mixin / non-DRY code?
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    queryParams: {
        siteId: {
            refreshModel: true
        }
    },

    model(params) {
        const query = {sort: '+created_on'};
        if (params.siteId) {
            query['filter[extra.studyId]'] = params.siteId;
        }
        return this.store.queryEverything('account', query);
    }
});
