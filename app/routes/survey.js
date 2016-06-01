import Ember from 'ember';


export default Ember.Route.extend({
  model() {
   return {
     cards: [
       {"id": 0, "content": "Situation 0"},
       {"id": 1, "content": "Situation 1"},
       {"id": 2, "content": "Situation 2"},
       {"id": 3, "content": "Situation 3"},
       {"id": 4, "content": "Situation 4"},
       {"id": 5, "content": "Situation 5"}
     ],
     buckets: {
       uncharacteristic: [],
       neutral: [],
       characteristic: []
     }
   }
  },
  setupController(controller, model) {
    this._super(controller, model);
    let card = model.cards[0];
    controller.set('moveButton', card);
  },
  actions: {
    moveButton(card, bucket) {
      var data = this.modelFor(this.routeName);
      if (card !== null) {
        data.buckets[bucket].unshiftObject(card);
      }
    }
  }
});
