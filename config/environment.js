/* jshint node: true */
require('dotenv').config({silent: false});

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'isp',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    i18n: {
      defaultLocale: 'en'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    sentry: {
      dsn: process.env.SENTRY_DSN || '',
      cdn: 'https://cdn.ravenjs.com/3.5.1/ember/raven.min.js'
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'participate.login',
    routeIfAlreadyAuthenticated: 'participate.survey'
  };

  ENV.JAMDB = {};

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  } else {
      // Get configuration settings from .env file
      ENV.JAMDB = {
          authorizer: 'jam-jwt',
          collection:'accounts',
          url: process.env.JAMDB_URL,
          namespace: 'isp'
      };
  }

  ENV.studyId = process.env.EXPERIMENT_ID;

  // List of study site location IDs that may be subject to sensitive content restrictions
  ENV.sensitiveStudies = ['DUMMY1.DUM'];

  ENV.featureFlags = {
    // Whether to load existing expData into the exp-frames
    loadData: true,

    // Whether to validate survey forms
    validate: true,

    // Whether to redirect users who have already taken the study to an error page
    // Set to false to test study multiple times with the same account
    showStudyCompletedPage: true,

    // Whether to take the participant to the last page they were on
    // when they exited the study. If false, start from the beginning.
    continueSession: true,

    // Whether to include the test locale or not
    excludeTestLocale: true,
  };

  return ENV;
};
