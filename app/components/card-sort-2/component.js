import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    dragCard(obj, ops) {
      var buckets = ops.target.buckets;
      console.log(buckets);
      for (var category in buckets) {
        if (buckets[category].contains(obj)) {
          buckets[category].removeObject(obj);
        }
      }

      this.sendAction('moveButton', obj, ops.target.bucket);
    },
    nextSection() {
      this.sendAction('nextSection');
    }
  }
});
