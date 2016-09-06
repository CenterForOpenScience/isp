import Ember from 'ember';
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


export default Ember.Component.extend({
    layout: layout,
    studyId: null,
    content: Ember.computed(function() {
      return content[this.get('studyId')];
    }),
    consentGranted: false,
    consentNotGranted: Ember.computed.not('consentGranted')
});
