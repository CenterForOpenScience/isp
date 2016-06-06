import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('overview-info-form', 'Integration | Component | overview info form', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{overview-info-form}}`);
  assert.ok(this.$('div[data-alpaca-field-name=age] label'));
  assert.ok(this.$('div[data-alpaca-field-name=gender] label'));
  assert.ok(this.$('div[data-alpaca-field-name=ethnicity] label'));
  assert.ok(this.$('div[data-alpaca-field-name=firstLanguage] label'));
  assert.ok(this.$('div[data-alpaca-field-name=socioeconomicStatus] label'));
  assert.ok(this.$('div[data-alpaca-field-name=birthLocation] label'));
  assert.ok(this.$('div[data-alpaca-field-name=residence] label'));
  assert.ok(this.$('div[data-alpaca-field-name=isReligious] label'));
  assert.ok(this.$('div[data-alpaca-field-name=religion] label'));
  assert.ok(this.$('div[data-alpaca-field-name=howReligious] label'));
});
