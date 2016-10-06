import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('progress-bar', 'Integration | Component | progress bar', {
  integration: true
});

test('it renders with correct width', function(assert) {
  this.set('pageNumber', 1);
  this.render(hbs`{{progress-bar pageNumber=pageNumber}}`);
  var width = (1 / 11) * 100;
  assert.equal(this.$('.progress-bar').attr('style'), `width: ${width}%;`);
});
