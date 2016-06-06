import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('free-response-form', 'Integration | Component | free response form', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{free-response-form}}`);
  assert.ok(this.$('div[data-alpaca-field-name=activity] label'));
  assert.ok(this.$('div[data-alpaca-field-name=location] label'));
  assert.ok(this.$('div[data-alpaca-field-name=peoplePresent] label'));

});
