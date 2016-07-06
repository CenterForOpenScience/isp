import Ember from 'ember';


var range = function(start, stop) {
    var options = [];
    for (var i=start; i <= stop; i++) {
        options.push(i);
    }
    return options;
};

const questions = {
  q1: {
    question: 'Age',
    type: 'select',
    scale: range(16, 100),
    value: null
  },
  q2: {
    question: 'Gender',
    type: 'select',
    scale: ['Male', 'Female', 'Other', 'I\'d rather not state'],
    value: null
  },
  q3: {
    question: 'What is your ethnicity?',
    type: 'input',
    value: null
  },
  q4: {
    question: 'What was your first language?',
    type: 'input',
    value: null
  },
  q5: {
    question: 'On a scale from 1 to 10 with 10 being people that are the most well off in society, and 1 ' +
              'being the people who are the least well off, where would you describe your family\'s position?',
    type: 'radio',
    scale: range(1, 10),
    labelTop: true,
    value: null
  },
  q6: {
    question: 'Birth Country and City',
    type: 'input',
    value: null
  },
  q7: {
    question: 'Hometown residence',
    type: 'select',
    scale: ['remote rural', 'rural', 'suburban', 'urban'],
    value: null
  },
  q8: {
    question: 'Do you follow a religion?',
    type: 'radio',
    scale: ['Yes', 'No'],
    labelTop: true,
    value: null
  },
  q9: {
    question: 'If so, which one do you follow?',
    type: 'input',
    optional: true,
    value: null
  },
  q10: {
    question: 'On a scale from 1 to 10, how religious are you?',
    type: 'radio',
    scale: range(1, 10),
    labelTop: true,
    value: null
  }
};

export default Ember.Component.extend({
  questions: questions,
  actions: {
    nextSection() {
        var formData = {};
        var questions = this.get('questions');
        for (var question in questions) {
          formData[question] = questions[question]['value'];
        }
        this.sendAction('update', formData, 'overview');
        this.sendAction('nextSection');
      }
  }
});
