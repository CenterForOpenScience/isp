import Ember from 'ember';

export default Ember.Component.extend({
  pageNumber: null,
  width: Ember.computed(function() {
    var width = (this.pageNumber/5) * 100;
    return width.toString() + '%';
  })
});
