import Ember from 'ember';

var cards = [
 {id: 0, content: "Situation 0"},
 {id: 1, content: "Situation 1"},
 {id: 2, content: "Situation 2"},
 {id: 3, content: "Situation 3"},
 {id: 4, content: "Situation 4"},
 {id: 5, content: "Situation 5"}
];

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
     cards: shuffle(cards),
     buckets: {
       uncharacteristic: [],
       neutral: [],
       characteristic: [],
       extremely_uncharacteristic: [],
       quite_uncharacteristic: [],
       fairly_uncharacteristic: [],
       somewhat_uncharacteristic: [],
       relatively_neutral: [],
       somewhat_characteristic: [],
       fairly_characteristic: [],
       quite_characteristic: [],
       extremely_characteristic: []
     }
   };
  },
  setupController(controller, model) {
    this._super(controller, model);
    let card = model.cards[0];
    controller.set('moveButton', card);
    controller.set('section', 'section-one');
  },
  actions: {
    moveButton(card, bucket) {
      var data = this.modelFor(this.routeName);
      if (card !== null) {
        data.buckets[bucket].unshiftObject(card);
      }
    },
    update(formData, key) {
      var data = this.modelFor(this.routeName);
      for (var item in formData) {
        data[key] = formData
      }
    },
    nextSection() {
      var section = this.controller.get('section');
      if (section === 'section-one') {
        this.controller.set('section', 'section-two');
      } else if (section === 'section-two') {
        this.controller.set('section', 'section-three');
      } else if (section === 'section-three') {
        this.controller.set('section', 'section-four')
      }
    }
  }
});
