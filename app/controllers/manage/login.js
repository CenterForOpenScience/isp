import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    i18n: Ember.inject.service(),

    authenticating: false,
    errorHeading: Ember.computed(function () {
        return this.get('i18n').t('login.errorHeading').string;
    }),

    actions: {
        authenticate(attrs) {
            this.set('authenticating', false);
            return this.get('session')
                .authenticate('authenticator:jam-jwt', attrs)
                .then(() => this.set('authenticating', false))
                .then(() => this.transitionToRoute('manage.who-completed'))
                .catch((e) => {
                    console.log(e);

                    if (e.status === 404 || e.status === 401) {
                        this.toggleProperty('invalidAuth');
                    } else {
                        this.toggleProperty('loginError');
                    }
                });
        },
        toggleAction(property) {
            this.toggleProperty(property);
        },
    }
});
