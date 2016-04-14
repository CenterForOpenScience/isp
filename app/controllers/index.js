import Ember from 'ember';

export default Ember.Controller.extend({
    studyId: null,
    participantId: null,
    actions: {
	submit ( ) {
	    console.log(this.getProperties('studyId', 'participantId'));
	}
    }
});
