import Ember from 'ember';


export default Ember.Component.extend({
  cards: null,
  buckets: null,
  actions: {
    dragCard(obj, ops) {
      var cards = ops.target.cards;
      var buckets = ops.target.buckets;
      var oldBucket;

      if (cards.contains(obj)) {
        oldBucket = cards;
      } else {
        for (var category in buckets) {
          if (buckets[category].contains(obj)) {
            oldBucket = buckets[category]
          }
        }
      }

      this.sendAction('moveCard', obj, oldBucket, ops.target.bucket);
    }
  }
});
