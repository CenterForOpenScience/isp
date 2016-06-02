import Ember from 'ember';


export default Ember.Component.extend({
  actions: {
    moveButton(cards, bucket) {
      var card = cards.shiftObject(); //always move top card from the stack
      this.sendAction('moveButton', card, bucket);
    },
    dragCard(obj, ops) {
      var cards = ops.target.cards;
      var buckets = ops.target.buckets;

      if (cards.contains(obj)) {
          cards.removeObject(obj);
      } else if (buckets.uncharacteristic.contains(obj)) {
          buckets.uncharacteristic.removeObject(obj);
      } else if (buckets.neutral.contains(obj)) {
          buckets.neutral.removeObject(obj);
      } else if (buckets.characteristic.contains(obj)){
           buckets.characteristic.removeObject(obj);
      }

      this.sendAction('moveButton', obj, ops.target.bucket);
    }
  }
});
