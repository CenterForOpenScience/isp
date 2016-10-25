import DS from 'ember-data';
import Session from 'exp-models/models/session';

export default Session.extend({
    frameIndex: DS.attr({defaultValue: 0}), // Index of the last visited exp-frame component
    surveyPage: DS.attr({defaultValue: 0}) // The last visited page within an exp-frame component
});
