define([
  'app/models/todo',
  'app/collections/todos',
  'app/views/todo-view',
  'env'
], function (Todo, todos, TodoView, ENV) {

  var AppView = Backbone.View.extend({
    el: '#todosapp',
    events: {
      'keypress #todo-new': 'create',
      'click #clear': 'clear'
    },
    initialize: function() {
      this.$list = this.$('#todos-list')

      this.listenTo(todos, 'add', this.addOne);
      this.listenTo(todos, 'reset', this.addAll);
      this.listenTo(todos, 'all', this.render);

      this.listenTo(todos, 'change:completed', this.filterOne);
      this.listenTo(todos, 'filter', this.filterAll);

      todos.fetch();

    },
    render: function() {
      if (todos.length) {
        this.$('.todos-filter, .todos-list, .todos-stat').show()

        this.$('.remaining').html(todos.remaining().length)
        this.$('.todos-filter a').removeClass('selected').filter('[href="#/' + ENV.filter + '"]').addClass('selected')
      } else {
        this.$('.todos-filter, .todos-list, .todos-stat').hide()
      }
    },
    create: function(e) {
      if (e.keyCode == 13) {
        var title = this.$('#todo-new')[0].value
        if (title !== '') {
          var todo = new Todo({title: title})
          if (todo.isValid()) {
            todos.create(todo)
          }
          this.$('#todo-new')[0].value = ''
        }
      }
    },
    addOne: function(todo) {
      var todoView = new TodoView({model: todo})
      this.$list.append(todoView.render().el)
    },
    addAll: function() {
      this.$list.html('')
      todos.each(this.addOne, this)
    },
    clear: function() {
      _.invoke(todos.completed(), 'destroy')
      return false
    },
    filterOne: function(todo) {
      todo.trigger('visible')
    },
    filterAll: function() {
      todos.each(this.filterOne, this)
    }
  });

  return AppView;

})
