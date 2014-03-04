define(['lib/backbone', 'app/models/todo'], function (Backbone, Todo) {

  var Todos = Backbone.Collection.extend({
    model: Todo,
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

  return new Todos;

})
