Tasks = new Mongo.Collection("tasks");

Router.configure({
  layoutTemplate: 'main',
  title: 'FitSole',
});
Router.route('/', {
  name     : 'landing',
  template : 'landing',
});
Router.route('/heatmap', { title: 'Heatmap | Fitsole' });
Router.route('/balance', { title: 'Balance | Fitsole' });
Router.route('/graphs', { title: 'Graphs | Fitsole' });
// Router.route('/share');
Router.route('/settings', { title: 'Settings | Fitsole' });
