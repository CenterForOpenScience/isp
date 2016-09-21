import Ember from 'ember';

var VALUES = {
 'disagreeStrongly': 1,
 'disagree': 2,
 'neutral': 3,
 'agree': 4,
 'agreeStrongly': 5
};

function averageScores(questions, reversed, items) {
  var total = score(questions, items) + reverseScore(reversed, items);
  return (total - 12)/48 * 100;
}

function score(questions, items) {
  var total = 0;
  for (var i=0; i < questions.length; i++) {
    var question = questions[i];
    var value = items[question - 1];
    total += VALUES[value];
  }
  return total;
}

function reverseScore(questions, items) {
  var total = 0;
  for (var i=0; i < questions.length; i++) {
    var question = questions[i];
    var value = items[question - 1];
    total += (6 - VALUES[value]);
  }
  return total;
}

export default Ember.Component.extend({
  session: null,
  feedback: Ember.computed(function() {
    var session = this.get('session');
    var items = session.get('expData')['3-3-rating-form']['responses']['4'];
    var extraversion = averageScores([1, 6, 21, 41, 46, 56], [11, 16, 26, 31, 36, 51], items);
    var agreeableness = averageScores([2, 7, 27, 32, 52, 57], [12, 17, 22, 37, 42, 47], items);
    var conscientiousness = averageScores([13, 18, 33, 38, 43, 53], [3, 8, 23, 28, 48, 58], items);
    var neuroticism = averageScores([4, 9, 24, 29, 44, 49], [14, 19, 34, 39, 54, 59], items);
    var openness = averageScores([10, 15, 20, 35, 40, 60], [5, 25, 30, 45, 50, 55], items);
    return [
      {
        'name': 'feedback.extra',
        'score': extraversion,
        'description': {
          'high': 'feedback.hiExtra',
          'low': 'feedback.loExtra'
        }
      },
      {
        'name': 'feedback.agree',
        'score': agreeableness,
        'description': {
          'high': 'feedback.hiAgree',
          'low': 'feedback.loAgree'
        }
      },
      {
        'name': 'feedback.consc',
        'score': conscientiousness,
        'description': {
          'high': 'feedback.hiConsc',
          'low': 'feedback.loConsc'
        }
      },
      {
        'name': 'feedback.neurot',
        'score': neuroticism,
        'description': {
          'high': 'feedback.hiNeurot',
          'low': 'feedback.loNeurot'
        }
      },
      {
        'name': 'feedback.open',
        'score': openness,
        'description': {
          'high': 'feedback.hiOpen',
          'low': 'feedback.loOpen'
        }
      }];
  })
});
