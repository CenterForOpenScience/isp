import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('info');
  this.route('faqs');
  this.route('contact');
  this.route('survey');
  this.route('consent');
});

export default Router;
