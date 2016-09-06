import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('isp-consent-form', 'Integration | Component | isp consent form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{isp-consent-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#isp-consent-form}}
      template block text
    {{/isp-consent-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
