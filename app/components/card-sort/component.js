import Ember from 'ember';


export default Ember.Component.extend({
  cards: null,
  buckets: null,
  responses: null,
  actions: {
    dragCard(card, ops) {
      var cards = ops.target.cards;
      var buckets = ops.target.buckets;
      var oldBucket;

      if (cards.contains(card)) {
        oldBucket = cards;
      } else {
        for (var category in buckets) {
          if (buckets[category].contains(card)) {
            oldBucket = buckets[category]
          }
        }
      }

      this.sendAction('moveCard', card, oldBucket, buckets[ops.target.bucket]);
    },
    nextSection() {
      this.sendAction('nextSection');
    }
  }
});
