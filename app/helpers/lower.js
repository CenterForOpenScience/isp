import Ember from 'ember';

export function lower([str,]/*, hash*/) {
    return str.toLowerCase();
}

export default Ember.Helper.helper(lower);
