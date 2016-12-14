import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('participate', { path: '' }, function() {
    this.route('login', { path: '/' });
    this.route('survey', function() {
      this.route('results');
      this.route('consent');
    });
    this.route('complete', { path: '/survey/complete'});
  });
  this.route('exit');
  this.route('manage', function() {
    this.route('who-completed');
  });
});

export default Router;
