import DS from 'ember-data';
import Session from 'exp-models/models/session';

export default Session.extend({
    hasGrantedConsent: DS.attr('boolean'), // Whether user agreed to participate in the study
    frameIndex: DS.attr({defaultValue: 0}), // Index of the last visited exp-frame component
    surveyPage: DS.attr({defaultValue: 0}) // The last visited page within an exp-frame component
});
