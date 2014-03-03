var app = app || {};

(function () {
  'use strict';

  var Todos = Backbone.Collection.extend({
    model: app.Todo,
    url: '/todos',
    completed: function() {
      return this.filter(function(todo) {
        return todo.get('completed');
      })
    },
    remaining: function() {
      return this.without.apply(this, this.completed());
    }
  });

  app.todos = new Todos;
}());