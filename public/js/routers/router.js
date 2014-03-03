var app = app || {};

(function () {
  'use strict';

  var Router = Backbone.Router.extend({
    routes: {
      '*filter' : 'setFilter'
    },
    setFilter: function(param) {
      app.filter = param || '';
      app.todos.trigger('filter');
    }
  });

  app.TodoRouter = new Router;
  Backbone.history.start();
}())