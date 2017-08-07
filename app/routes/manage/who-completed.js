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
    },
    
    actions: {

        // Override Embers queryParamsDidChange function, and make a few modifications.
        // The initial function uses 'this.refresh' which will call multiple times, causing transition aborts
        // Replacing with nesting the call in a Ember.run.once fixes this
        queryParamsDidChange(changed, totalPresent, removed){
            //queryParams map
            var qpMap = this.get('_qp').map;
            var totalChanged = Object.keys(changed).concat(Object.keys(removed));
            for (var i = 0; i < totalChanged.length; ++i){
                var qp = qpMap[totalChanged[i]];
                // the this.router.currentState variable causes a page refresh to fail this check. Prevents a failed promise. 
                if (qp && this._optionsForQueryParam(qp).refreshModel && this.router.currentState) {
                    Ember.run.once(this, this.refresh);
                }
            }
            return true;
        },
    }
});
