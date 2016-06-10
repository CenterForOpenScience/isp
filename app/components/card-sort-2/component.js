import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    dragCard(obj, ops) {
      var buckets = ops.target.buckets;
      var buckets2 = ops.target.buckets2;
      var oldBucket;
      var target = buckets2[ops.target.bucket];

      for (var category in buckets) {
        if (buckets[category].contains(obj)) {
          oldBucket = buckets[category];
        }
      }
      for (var category in buckets2) {
        if (buckets2[category].contains(obj)) {
          oldBucket = buckets2[category];
        }
      }
      this.sendAction('moveCard', obj, oldBucket, target);
    },
    nextSection() {
      this.sendAction('nextSection');
    }
  }
});
