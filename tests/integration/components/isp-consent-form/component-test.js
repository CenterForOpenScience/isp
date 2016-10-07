import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('isp-consent-form', 'Integration | Component | isp consent form', {
  integration: true
});

test('it renders', function(assert) {
  this.set('studyId', 'test');
  this.set('grantConsent', (actual) => {
    assert.deepEqual(actual, true);
  });
  // Pass in hasGrantedConsent instead of setting property to override default value
  this.render(hbs`{{isp-consent-form studyId=studyId grantConsent=(action grantConsent) hasGrantedConsent=true}}`);
  assert.notOk((this.$('button').attr('disabled')));
  this.$('button').click();
});
