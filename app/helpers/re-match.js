import Ember from 'ember';

export function reMatch([pattern, str]/*, hash*/) {
  return window.RegExp(pattern).test(str);
}

export default Ember.Helper.helper(reMatch);
