import Ember from 'ember';
import {translations} from '../../utils/translations';

const TEN_POINT_SCALE = [
  translations.number0,
  translations.number1,
  translations.number2,
  translations.number3,
  translations.number4,
  translations.number5,
  translations.number6,
  translations.number7,
  translations.number8,
  translations.number9,
  translations.number10
];
const SEVEN_POINT_SCALE = TEN_POINT_SCALE.slice(0, 8);
const NINE_POINT_SCALE = TEN_POINT_SCALE.slice(0, 10);


var generateSchema = function(question, type, items, scale, options) {
  var ret = {
    question: question,
    type: type,
    scale: scale,
    items: {}
  };
  for (var item in items) {
    ret.items[item] = {
      description: items[item]['label'],
      value: null
    };
    for (var option in options) {
      ret.items[item][option] = options[option];
    }
  }
  return ret;
};


var model = {
  q1: generateSchema(
    translations.measures.questions['1'].label,
    'select',
    translations.measures.questions['1'].items,
    [
      translations.measures.questions['1'].options.extremelyNeg,
      translations.measures.questions['1'].options.quiteNeg,
      translations.measures.questions['1'].options.fairlyNeg,
      translations.measures.questions['1'].options.somewhatNeg,
      translations.measures.questions['1'].options.neither,
      translations.measures.questions['1'].options.somewhatPos,
      translations.measures.questions['1'].options.fairlyPos,
      translations.measures.questions['1'].options.quitePos,
      translations.measures.questions['1'].options.extremelyPos
    ]
  ),
  q2: generateSchema(
    translations.measures.questions['2'].label,
    'radio',
    {'item1': ''},
    SEVEN_POINT_SCALE,
    {
      labelTop: false,
      labels: [{
          rating: 0,
          label: translations.measures.questions['2'].options.never
        },
        {
          rating: 2,
          label: translations.measures.questions['2'].options.hardleyEver
        },
        {
          rating: 4,
          label: translations.measures.questions['2'].options.occasionally
        },
        {
          rating: 6,
          label: translations.measures.questions['2'].options.quiteOften
        }
      ]
    }
  ),
  q3: generateSchema(
    translations.measures.questions['3'].label,
    'radio',
    {'item1': ''},
    TEN_POINT_SCALE,
    {
      labelTop: false,
      labels: [{
          rating: 0,
          label: translations.measures.questions['3'].options.unwilling
        },
        {
          rating: 10,
          label: translations.measures.questions['3'].options.fullyPrepared
        }
      ]
    }
  ),
  q4: generateSchema(
    translations.measures.questions['4'].label,
    'radio',
    translations.measures.questions['4'].items,
    [
      translations.measures.questions['4'].options.extremelyUnchar,
      translations.measures.questions['4'].options.quiteUnchar,
      translations.measures.questions['4'].options.fairlyUnchar,
      translations.measures.questions['4'].options.somewhatUnchar,
      translations.measures.questions['4'].options.neutral,
      translations.measures.questions['4'].options.somewhatChar,
      translations.measures.questions['4'].options.fairlyChar,
      translations.measures.questions['4'].options.quiteChar,
      translations.measures.questions['4'].options.extremelyChar
    ],
    {labelTop: true}
  ),
  q5: generateSchema(
    translations.measures.questions['5'].label,
    'radio',
    translations.measures.questions['5'].items,
    [
      translations.measures.questions['5'].options.disagreeStrongly,
      translations.measures.questions['5'].options.disagree,
      translations.measures.questions['5'].options.neutral,
      translations.measures.questions['5'].options.agree,
      translations.measures.questions['5'].options.agreeStrongly
    ],
    {labelTop: true}
  ),
  q6: {
    question: translations.measures.questions['6'].label,
    type: 'radio',
    scale: SEVEN_POINT_SCALE,
    items: {
      part1: {
        description: translations.measures.questions['6'].items['1'].label,
        value:null,
        labelTop: false,
        labels: [{
            rating: 0,
            label: translations.measures.questions['6'].items['1'].options.notHappy
          },
          {
            rating: 7,
            label: translations.measures.questions['6'].items['1'].options.veryHappy
          }]
      },
      part2: {
        description: translations.measures.questions['6'].items['2'].label,
        scale: SEVEN_POINT_SCALE,
        value:null,
        labelTop: false,
        labels: [{
            rating: 0,
            label: translations.measures.questions['6'].items['2'].options.moreHappy
          },
          {
            rating: 7,
            label: translations.measures.questions['6'].items['2'].options.lessHappy
          }]
      },
      part3: {
        description: translations.measures.questions['6'].items['3'].label,
        scale: SEVEN_POINT_SCALE,
        value:null,
        labelTop: false,
        labels: [{
            rating: 0,
            label: translations.measures.questions['6'].items['4'].options.notAtAll
          },
          {
            rating: 7,
            label: translations.measures.questions['6'].items['4'].options.aGreatDeal
          }]
      },
      part4: {
        description: translations.measures.questions['6'].items['4'].label,
        scale: SEVEN_POINT_SCALE,
        value:null,
        labelTop: false,
        labels: [{
            rating: 0,
            label: translations.measures.questions['6'].items['4'].options.notAtAll
          },
          {
            rating: 7,
            label: translations.measures.questions['6'].items['4'].options.aGreatDeal
          }]
      }
    }
  },
  q7: generateSchema(
    translations.measures.questions['7'].label,
    'radio',
    translations.measures.questions['7'].items,
    [
      translations.measures.questions['7'].options.disagreeStrongly,
      translations.measures.questions['7'].options.disagree,
      translations.measures.questions['7'].options.neutral,
      translations.measures.questions['7'].options.agree,
      translations.measures.questions['7'].options.agreeStrongly
    ],
    {labelTop: true}
  ),
  q8: generateSchema(
    translations.measures.questions['8'].label,
    'radio',
    translations.measures.questions['8'].items,
    [
      translations.measures.questions['8'].options.disbelieveStrong,
      translations.measures.questions['8'].options.disbelieveLittle,
      translations.measures.questions['8'].options.neutral,
      translations.measures.questions['8'].options.believeLittle,
      translations.measures.questions['8'].options.believeStrong
    ],
    {labelTop: true}
  ),
  q9: generateSchema(
    translations.measures.questions['9'].label,
    'radio',
    translations.measures.questions['9'].items,
    NINE_POINT_SCALE,
    {
      labelTop: false,
      labels: [{
          rating: 0,
          label: translations.measures.questions['9'].options.notAtAll
        },
        {
          rating: 3,
          label: translations.measures.questions['9'].options.aLittle
        },
        {
          rating: 5,
          label: translations.measures.questions['9'].options.moderately
        },
        {
          rating: 7,
          label: translations.measures.questions['9'].options.veryWell
        },
        {
          rating: 9,
          label: translations.measures.questions['9'].options.exactly
        }]
    }
  ),
  q10: generateSchema(
    translations.measures.questions['10'].label,
    'radio',
    translations.measures.questions['10'].items,
    [
      translations.measures.questions['10'].options.disagreeStrongly,
      translations.measures.questions['10'].options.disagree,
      translations.measures.questions['10'].options.neutral,
      translations.measures.questions['10'].options.agree,
      translations.measures.questions['10'].options.agreeStrongly
    ],
    {labelTop: true}
  ),
  q11: {
    question: translations.measures.questions['11'].label,
    type: 'radio-input',
    scale: [translations.global.yesLabel, translations.global.noLabel],
    items: {
      radio: {
        value: null
      },
      input: {
        description: translations.measures.questions['12'].label,
        value:null
      }
    }
  },
  q13: generateSchema(
    translations.measures.questions['13'].label,
    'radio',
    translations.measures.questions['13'].items,
    [
      translations.measures.questions['13'].options.disagreeStrongly,
      translations.measures.questions['13'].options.disagree,
      translations.measures.questions['13'].options.neutral,
      translations.measures.questions['13'].options.agree,
      translations.measures.questions['13'].options.agreeStrongly
    ],
    {labelTop: true}
  ),
  q14: generateSchema(
    translations.measures.questions['14'].label,
    'radio',
    translations.measures.questions['14'].items,
    [
      translations.measures.questions['14'].options.disagreeStrongly,
      translations.measures.questions['14'].options.disagree,
      translations.measures.questions['14'].options.neutral,
      translations.measures.questions['14'].options.agree,
      translations.measures.questions['14'].options.agreeStrongly
    ],
    {labelTop: true}
  ),
  q15: generateSchema(
    translations.measures.questions['15'].label,
    'radio',
    translations.measures.questions['15'].items,
    [
      translations.measures.questions['15'].options.disagreeStrongly,
      translations.measures.questions['15'].options.disagree,
      translations.measures.questions['15'].options.neutral,
      translations.measures.questions['15'].options.agree,
      translations.measures.questions['15'].options.agreeStrongly
    ],
    {labelTop: true}
  ),
  q16: generateSchema(
    translations.measures.questions['16'].label,
    'radio',
    translations.measures.questions['16'].items,
    [
      translations.measures.questions['16'].options.notAtAll,
      translations.measures.questions['16'].options.aLittle,
      translations.measures.questions['16'].options.quiteaBit,
      translations.measures.questions['16'].options.completely
    ],
    {labelTop: true}
  ),
  q17: {
    question: translations.measures.questions['17'].label,
    type: 'textarea',
    items: {
      input: {
        value:null
      }
    }
  }
};


export default Ember.Component.extend({
  questions: model,
  actions: {
    nextSection() {
      var formData = {};
      var questions = this.get('questions');
      for (var question in questions) {
        formData[question] = {};
        for (var part in questions[question]['items']) {
          formData[question][part] = questions[question]['items'][part]['value'];
        }
      }
      this.sendAction('update', formData, 'ratingForm');
      this.sendAction('nextSection');
    }
  }
});
