import Ember from 'ember';
import {translations} from '../utils/translations';


var formatCards = function(items) {
  var cards = [];
  for (var item in items) {
    cards.push({
      id: item,
      content: items[item]
    })
  }
  return cards;
};


// h/t: http://stackoverflow.com/a/6274398
var shuffle = function(array) {
  let n = array.length;
  while (n > 0) {
      let index = Math.floor(Math.random() * n);
      n--;  //1
      let temp = array[n];
      array[n] = array[index];
      array[index] = temp;
  }
  return array;
};

export default Ember.Route.extend({
  model() {
   return {
     cards: shuffle(formatCards(translations.qsort.rsq.item)),
     cardSort1: {
       uncharacteristic: [],
       neutral: [],
       characteristic: []
     },
     cardSort2: {
       group1: {
         extremely_uncharacteristic: {
           cards: [],
           name: "Extremely Uncharacteristic",
           max: 3
         },
         quite_uncharacteristic: {
           cards: [],
           name: "Quite Uncharacteristic",
           max: 6
         },
         fairly_uncharacteristic: {
           cards: [],
           name: "Fairly Uncharacteristic",
           max: 11
         }
       },
       group2: {
         somewhat_uncharacteristic: {
           cards: [],
           name: "Somewhat Uncharacteristic",
           max: 15
         },
         relatively_neutral: {
           cards: [],
           name: "Relatively Neutral",
           max: 20
         },
         somewhat_characteristic: {
           cards: [],
           name: "Somewhat Characteristic",
           max: 15
         }
       },
       group3: {
         fairly_characteristic: {
           cards: [],
           name: "Fairly Characteristic",
           max: 11
         },
         quite_characteristic: {
           cards: [],
           name: "Quite Characteristic",
           max: 6
         },
         extremely_characteristic: {
           cards: [],
           name: "Extremely Characteristic",
           max: 3
         }
       }
     }
   };
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('section', 'section-one');
  },
  actions: {
    moveCard(card, source, target) {
      source.removeObject(card);
      target.unshiftObject(card);
    },
    update(formData, key) {
      var data = this.modelFor(this.routeName);
      for (var item in formData) {
        data[key] = formData;
      }
    },
    nextSection() {
      var section = this.controller.get('section');
      if (section === 'section-one') {
        this.controller.set('section', 'section-two');
      } else if (section === 'section-two') {
        this.controller.set('section', 'section-three');
      } else if (section === 'section-three') {
        this.controller.set('section', 'section-four');
      } else if (section === 'section-four') {
        this.controller.set('section', 'section-five');
      }
    }
  }
});
