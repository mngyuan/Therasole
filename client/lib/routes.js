Tasks    = new Mongo.Collection("tasks");
MockData = new Mongo.Collection("mockdata");

Router.configure({
  layoutTemplate: 'main',
  title: 'Therasole',
});
Router.route('/', {
  name     : 'landing',
  template : 'heatmap',
});
Router.route('/heatmap', { title: 'Heatmap | Therasole' });
Router.route('/balance', { title: 'Balance | Therasole' });
Router.route('/graphs', { title: 'Graphs | Therasole' });
Router.route('/graphs/:_filter', {
  template: 'graphs',
  data: function() {
    var filter = this.params._filter;
    return {filter};
  }
});
Router.route('/share', { title: 'Share | Therasole' });
Router.route('/settings', { title: 'Settings | Therasole' });
