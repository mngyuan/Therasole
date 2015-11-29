Tasks = new Mongo.Collection("tasks");

Router.route('/', {
  name     : 'landing',
  template : 'landing'
});
Router.configure({
  layoutTemplate: 'main'
});
Router.route('/heatmap');
Router.route('/balance');
Router.route('/graphs');
// Router.route('/share');
Router.route('/settings');
