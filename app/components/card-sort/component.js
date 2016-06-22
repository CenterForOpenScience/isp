import Ember from 'ember';


export default Ember.Component.extend({
  page: 'cardSort1',
  cards: null,
  buckets: null,
  buckets2: null,
  responses: null,
  isValid: Ember.computed(
    'buckets2.group1.extremely_uncharacteristic.cards.[]',
    'buckets2.group1.quite_uncharacteristic.cards.[]',
    'buckets2.group1.fairly_uncharacteristic.cards.[]',
    'buckets2.group2.somewhat_uncharacteristic.cards.[]',
    'buckets2.group2.relatively_neutral.cards.[]',
    'buckets2.group2.somewhat_characteristic.cards.[]',
    'buckets2.group3.fairly_characteristic.cards.[]',
    'buckets2.group3.quite_characteristic.cards.[]',
    'buckets2.group3.extremely_characteristic.cards.[]',
    function() {
      var buckets = this.buckets2;
      for (var group in buckets) {
        for (var category in buckets[group]) {
          var bucket = buckets[group][category];
            if (bucket.cards.length !== bucket.max) {
              return false;
            }
          }
      }
      return true;
  }),
  actions: {
    dragCard(card, ops) {
      var cards = ops.target.cards;
      var buckets = ops.target.buckets;
      var buckets2 = ops.target.buckets2;
      var source;
      var target = ops.target.bucket;

      if (cards && cards.contains(card)) {
        source = cards;
      }
      for (var category in buckets) {
        if (buckets[category].contains(card)) {
          source = buckets[category];
        }
      }
      for (var group in buckets2) {
        for (var category in buckets2[group]) {
          var bucket = buckets2[group][category];
            if (bucket['cards'].contains(card)) {
             source = bucket['cards'];
          }
        }
      }
      this.sendAction('moveCard', card, source, target);
    },
    nextPage() {
      //Change page view to second card sort form
      this.set('page', 'cardSort2');
    },
    nextSection() {
      // Go to next survey section
      this.sendAction('nextSection');
    }
  }
});
