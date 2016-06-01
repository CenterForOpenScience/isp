import Ember from 'ember';


export default Ember.Component.extend({
  actions: {
    moveButton(cards, bucket) {
      var card = cards.shiftObject();
      this.sendAction('moveButton', card, bucket);
    }
  }
});
