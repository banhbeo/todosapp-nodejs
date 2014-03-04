define([
  'lib/backbone',
  'app/collections/todos',
  'env'
], function (Backbone, todos, ENV) {

  var Router = Backbone.Router.extend({
    routes: {
      '*filter' : 'setFilter'
    },
    setFilter: function(param) {
      ENV.filter = param || '';
      todos.trigger('filter');
    }
  });

  return Router;

});
