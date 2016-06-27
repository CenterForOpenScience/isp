import Ember from 'ember';


const CHARACTERISTIC_RATINGS = [
  'Extremely Uncharacteristic',
  'Quite Uncharacteristic',
  'Fairly Uncharacteristic',
  'Somewhat Uncharacteristic',
  'Relatively Neutral',
  'Somewhat Characteristic',
  'Fairly Characteristic',
  'Quite Characteristic',
  'Extremely Characteristic'
];

const AGREEMENT_RATINGS = [
  'Disagree strongly',
  'Disagree',
  'Neutral; no opinion',
  'Agree',
  'Agree strongly'
];

const BELIEF_RATINGS = [
  'Strongly disbelieve',
  'Disbelieve a little',
  'Neutral; no opinion',
  'Believe a little',
  'Strongly believe'
];

const SEVEN_POINT_SCALE = ['0', '1', '2', '3', '4', '5', '6', '7'];


var schema = {
  question1: {
    question: '2. Please rate your behavior at 7 pm/10 am yesterday',
    part1: {
      description: 'I tried to control the situation.',
      options: CHARACTERISTIC_RATINGS,
      value:null,
      labelTop: true
    },
    part2: {
      description: 'I said negative things about myself.',
      options: CHARACTERISTIC_RATINGS,
      value:null,
      labelTop: true
    },
    part3: {
      description: 'I behaved in a competitive manner.',
      options: CHARACTERISTIC_RATINGS,
      value:null,
      labelTop: true
    }
  },
  question2: {
    question: '3. Please indicate the extent to which you agree with each statement.',
    part1: {
      description: 'Is outgoing, sociable',
      options: AGREEMENT_RATINGS,
      value:null,
      labelTop: true
    },
    part2: {
      description: 'Is compassionate, has a soft heart',
      options: AGREEMENT_RATINGS,
      value:null,
      labelTop: true

    },
    part3: {
      description: 'Tends to be disorganized',
      options: AGREEMENT_RATINGS,
      value:null,
      labelTop: true
    }
  },
  question3: {
    question: '4. For each of the following questions, please indicate the point on the 7-point scale that best describes you.',
    part1: {
      description: 'In general, I consider myself:',
      options: SEVEN_POINT_SCALE,
      value:null,
      labelTop: false,
      labels: [{
          rating: 0,
          label: 'not a very happy person'
        },
        {
          rating: 7,
          label: 'a very happy person'
        }]
    }
  }
};


export default Ember.Component.extend({
  questions: schema,
  ratings: CHARACTERISTIC_RATINGS,
  actions: {
    nextSection() {
      var formData = {};
      var questions = this.get('questions');
      for (var question in questions) {
        formData[question] = {};
        for (var part in questions[question]) {
          formData[question][part] = questions[question][part]['value'];
        }
      }
      this.sendAction('update', formData, 'ratingForm');
      this.sendAction('nextSection');
    }
  }
});
