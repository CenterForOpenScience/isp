import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';


const localeStub = Ember.Service.extend({
  locale: null
});

moduleForComponent('language-picker', 'Integration | Component | language picker', {
  integration: true,

  beforeEach: function() {
    this.register('service:i18n', localeStub);
    this.inject.service('i18n', { as: 'i18n' });
  }
});

test('it sets the locale', function(assert) {

  this.set('selectLanguage', (language, code) => {
    assert.deepEqual(language, 'English (US)');
    assert.deepEqual(code, 'en-US');
  });

  this.render(hbs`{{language-picker onPick=(action selectLanguage)}}`);

  this.$('.flag-icon-us').parent().click();
  assert.equal(this.get('i18n.locale'), 'en-US');

});
