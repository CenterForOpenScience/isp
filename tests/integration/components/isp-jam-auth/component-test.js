import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('isp-jam-auth', 'Integration | Component | isp jam auth', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{isp-jam-auth}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#isp-jam-auth}}
      template block text
    {{/isp-jam-auth}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
