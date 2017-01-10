import Ember from 'ember';
import {siteNames} from '../../components/isp-consent-form/consentText';

import {writeCSV} from 'exp-models/utils/csv-writer';

export default Ember.Controller.extend({
    queryParams: ['siteId'],
    siteId: '',

    siteNames: siteNames,

    accountData: Ember.computed('model.[]', function() {
        // TODO: Write
        const model = this.get('model') || [];
        return model.map(item => ({
            userID: item.id,
            hasCompletedStudy: item.get('extra.hasCompletedStudy') ? 'yes' : 'no'
        }));
    }),

    actions: {
        exportResults() {
            const headers = ['userID', 'hasCompletedStudy'];
            const data = this.get('accountData');
            let blob = new window.Blob([writeCSV(data, headers)], {
                type: 'text/plain;charset=utf-8'
            });
            const siteID = this.get('siteId');
            const filename = siteID ? `isp-completion-${siteID}.csv` : 'isp-completion.csv';
            window.saveAs(blob, filename);
        }
    }
});
