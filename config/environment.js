/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'isp',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    i18n: {
      defaultLocale: 'en-us'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'development') {
    ENV.JAMDB = {
      authorizer: 'jam-jwt',
      collection:'accounts',
      namespace: 'experimenter',
      url: 'http://localhost:1212'
    };
  }

  if (environment === 'staging' || environment === 'production') {
    ENV.JAMDB = {
      authorizer: 'jam-jwt',
      collection:'accounts',
      url: process.ENV.JAM_URL || 'https://staging-metadata.osf.io',
      namespace: 'isp'
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV.studyId = process.env.STUDY_ID;

  return ENV;
};
