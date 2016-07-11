import Ember from 'ember';
import {translations} from '../../utils/translationStrings';
import {validator, buildValidations} from 'ember-cp-validations';

const MAX_LENGTH = 75;

var generateValidators = function(questions) {
  var validators = {};
  var presence = validator('presence', {
      presence:true,
      message: 'This field is required'
  });
  for (var question in questions) {
      var isOptional = questions[question].optional;
      if (!isOptional) {
        var key = 'questions.' + question + '.value';
        validators[key] = presence;
    }
  }
  return validators;
};

function getRemaining(value) {
    var length = 0;
    if (value !== null) {
      length = value.length;
    }
    return (MAX_LENGTH - length).toString();
}

const questions = {
  q1: {
    label: translations.survey.sections['2'].questions['11'].label,
    value: null
  },
  q2: {
    label: translations.survey.sections['2'].questions['12'].label,
    value: null
  },
  q3: {
    label: translations.survey.sections['2'].questions['13'].label,
    value: null
  }
};

const Validations = buildValidations(generateValidators(questions));

export default Ember.Component.extend(Validations, {
  questions: questions,
  diff1: Ember.computed('questions.q1.value', function() {
    return getRemaining(this.questions.q1.value);
  }),
  diff2: Ember.computed('questions.q2.value', function() {
    return getRemaining(this.questions.q2.value);
  }),
  diff3: Ember.computed('questions.q3.value', function() {
    return getRemaining(this.questions.q3.value);
  }),
  actions: {
    nextSection() {
      if (this.get('validations.isValid')) {
        var formData = {};
        var questions = this.get('questions');
        for (var question in questions) {
          formData[question] = questions[question]['value'];
        }
        this.sendAction('update', formData, 'freeResponse');
        this.sendAction('nextSection');
      }
    }
  }
});
