import Ember from 'ember';

export default Ember.Component.extend({
  pageNumber: null,
  width: Ember.computed('pageNumber', function() {
    var width = (this.pageNumber / 11) * 100;
    return new Ember.String.htmlSafe('width: ' + width + '%;');
  })
});
