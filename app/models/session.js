import DS from 'ember-data';
import Session from 'exp-models/models/session';

export default Session.extend({
    frameIndex: DS.attr(),
    surveyPage: DS.attr()
});
