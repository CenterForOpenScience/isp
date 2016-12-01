import Ember from 'ember';
// import {siteNames} from 'exp-player/components/isp-consent-form/consent-text';

export default Ember.Controller.extend({
    queryParams: ['siteId'],
    siteId: '',

    // siteNames: Ember.computed.readOnly('siteNames')
});
