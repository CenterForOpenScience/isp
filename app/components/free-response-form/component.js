import Ember from 'ember';

const MAX_LENGTH = 75;

function getRemaining(value) {
    var length = 0;
    if (value !== null) {
      length = value.length;
    }
    return (MAX_LENGTH - length).toString();
}

export default Ember.Component.extend({
  questions: {
    q1: {
      label: 'What were you doing yesterday at 10am/7pm?',
      value: null
    },
    q2: {
      label: 'Where were you?',
      value: null
    },
    q3: {
      label: 'Who else was present? (If you were alone, please write "alone").',
      value: null
    }
  },
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
      var formData = {};
        var questions = this.get('questions');
        for (var question in questions) {
          formData[question] = questions[question]['value'];
        }
        this.sendAction('update', formData, 'freeResponse');
        this.sendAction('nextSection');
    }
  }
});
