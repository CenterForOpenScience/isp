import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' }, function() {
    this.route('info');
    this.route('faqs');
    this.route('contact');
  });
  this.route('participate', { path: '' }, function() {
    this.route('login');
    this.route('survey', function() {
      this.route('results');
      this.route('consent');
    });
  });
  this.route('exit');
});

export default Router;
