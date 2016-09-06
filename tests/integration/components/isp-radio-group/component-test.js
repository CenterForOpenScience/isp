import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('isp-radio-group', 'Integration | Component | isp radio group', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{isp-radio-group}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#isp-radio-group}}
      template block text
    {{/isp-radio-group}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
