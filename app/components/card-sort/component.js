import Ember from 'ember';


export default Ember.Component.extend({
  cards: null,
  buckets: null,
  responses: null,
  actions: {
    dragCard(card, ops) {
      var cards = ops.target.cards;
      var buckets = ops.target.buckets;
      var source;

      if (cards.contains(card)) {
        source = cards;
      } else {
        for (var category in buckets) {
          if (buckets[category].contains(card)) {
            source = buckets[category]
          }
        }
      }

      this.sendAction('moveCard', card, source, buckets[ops.target.bucket]);
    },
    nextSection() {
      this.sendAction('nextSection');
    }
  }
});
