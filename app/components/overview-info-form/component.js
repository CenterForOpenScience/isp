import Ember from 'ember';
import {translations} from '../../utils/translationStrings';
import {validator, buildValidations} from 'ember-cp-validations';


var range = function(start, stop) {
  var options = [];
  for (var i=start; i <= stop; i++) {
    var key = 'number' + i;
    options.push(key);
  }
  return options;
};

var generateValidators = function(questions) {
  var validators = {};
  var presence = validator('presence', {
    presence:true,
    message: 'This field is required'
  });
  for (var question in questions) {
    var isOptional = 'optional' in questions[question] && questions[question]['optional'];
    if (!isOptional) {
      var key = 'questions.' + question + '.value';
      validators[key] = presence;
    }
  }
  return validators;
};

const questions = [
  {
    question: translations.survey.sections['1'].questions['1'].label,
    type: 'select',
    scale: range(16, 100),
    value: null
  },
  {
    question: translations.survey.sections['1'].questions['2'].label,
    type: 'select',
    scale: [translations.survey.sections['1'].questions['2'].options.male,
      translations.survey.sections['1'].questions['2'].options.female,
      translations.survey.sections['1'].questions['2'].options.other,
      translations.survey.sections['1'].questions['2'].options.na
    ],
    value: null
  },
  {
    question: translations.survey.sections['1'].questions['3'].label,
    type: 'input',
    value: null
  },
  {
    question: translations.survey.sections['1'].questions['4'].label,
    type: 'input',
    value: null
  },
  {
    question:translations.survey.sections['1'].questions['5'].label,
    type: 'radio',
    scale: range(1, 10),
    labelTop: true,
    value: null
  },
  {
    question: translations.survey.sections['1'].questions['6'].label,
    type: 'input',
    value: null
  },
  {
    question: translations.survey.sections['1'].questions['7'].label,
    type: 'select',
    scale: [
      translations.survey.sections['1'].questions['7'].options.remoteRural,
      translations.survey.sections['1'].questions['7'].options.rural,
      translations.survey.sections['1'].questions['7'].options.suburban,
      translations.survey.sections['1'].questions['7'].options.urban
    ],
    value: null
  },
  {
    question: translations.survey.sections['1'].questions['8'].label,
    type: 'radio',
    scale: [translations.global.yesLabel, translations.global.noLabel],
    labelTop: true,
    value: null
  },
  {
    question: translations.survey.sections['1'].questions['9'].label,
    type: 'input',
    optional: true,
    value: null
  },
  {
    question: translations.survey.sections['1'].questions['10'].label,
    type: 'radio',
    scale: range(1, 10),
    labelTop: true,
    value: null
  }];

const Validations = buildValidations(generateValidators(questions));

export default Ember.Component.extend(Validations, {
  questions: questions,
  actions: {
    nextSection() {
      if (this.get('validations.isValid')) {
        var formData = {};
        var questions = this.get('questions');
        for (var question in questions) {
          formData[question] = questions[question]['value'];
        }
        this.sendAction('update', formData, 'overview');
        this.sendAction('nextSection');
      }
    }
  }
});
