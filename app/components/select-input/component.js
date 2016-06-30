import Ember from 'ember';
import layout from './template';

//h/t http://balinterdi.com/2015/08/29/how-to-do-a-select-dropdown-in-ember-20.html
export default Ember.Component.extend({
  layout,
  options: null,
  value: null
});
