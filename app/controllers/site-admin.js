import Ember from 'ember';
import {siteNames} from '../components/isp-consent-form/consentText';

export default Ember.Controller.extend({
    queryParams: ['siteId'],
    siteId: '',

    siteNames: siteNames,

    actions: {
        exportResults() {
            alert('This feature has not yet been implemented. We apologize for the inconvenience.');
        }
    }
});
