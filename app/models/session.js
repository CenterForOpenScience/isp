import DS from 'ember-data';
import Session from 'exp-models/models/session';

export default Session.extend({
    frameIndex: DS.attr({defaultValue: 0}),
    surveyPage: DS.attr({defaultValue: 0})
});
