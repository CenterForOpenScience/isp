import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    dragCard(obj, ops) {
      var buckets = ops.target.buckets;
      var buckets2 = ops.target.buckets2;
      var source;
      var target = ops.target.bucket;

      for (var category in buckets) {
        if (buckets[category].contains(obj)) {
          source = buckets[category];
        }
      }
      for (var group in buckets2) {
        for (var category in buckets2[group]) {
          var bucket = buckets2[group][category];
            if (bucket['cards'].contains(obj)) {
             source = bucket['cards'];
          }
        }
      }
      this.sendAction('moveCard', obj, source, target);
    },
    nextSection() {
      this.sendAction('nextSection');
    }
  }
});
