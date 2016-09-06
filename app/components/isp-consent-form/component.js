import Ember from 'ember';
import ExpConsentComponent from 'exp-player/components/exp-consent';
import layout from './template';

var content = {
  'test': {
    'title': 'Consent Test',
    'paragraphs': {
      'p1': 'Test paragraph 1',
      'p2': 'Test is paragraph 2',
      'p3': 'Test is paragraph 3'
    },
    'consentLabel': 'Test consent label.',
    'buttonLabel': 'Test buttonLabel'
  },
  'test2': {
    'title': 'Consent Test 2',
    'paragraphs': {
      'p1': 'Test2 paragraph 1',
      'p2': 'Test2 paragraph 2'
    },
    'consentLabel': 'Test consent label 2',
    'buttonLabel': 'Test buttonLabel 2'
  }
};



export default ExpConsentComponent.extend({
    type: 'exp-isp-consent',
    layout: layout,
    studyId: null,
    content: Ember.computed(function() {
      return content[this.get('studyId')];
    }),
    meta: {
        name: 'Consent Form',
        description: 'A simple consent form.',
        parameters: {
            type: 'object',
            properties: {
            }
        },
        data: {
            type: 'object',
            properties: {
                // data structure defined in exp-consent.js
            }
        }
    }
});
