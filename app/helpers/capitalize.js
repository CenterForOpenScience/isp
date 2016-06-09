import Ember from 'ember';

export function capitalize([str,]/*, hash*/) {
    return Ember.String.capitalize(str);
}

export default Ember.Helper.helper(capitalize);
