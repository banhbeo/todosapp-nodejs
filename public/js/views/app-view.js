var app = app || {};

(function () {
  'use strict';

  var AppView = Backbone.View.extend({
    el: '#todosapp',
    events: {
      'keypress #todo-new': 'create',
      'click #clear': 'clear'
    },
    initialize: function() {
      this.$list = this.$('#todos-list')
      
      this.listenTo(app.todos, 'add', this.addOne);
      this.listenTo(app.todos, 'reset', this.addAll);
      this.listenTo(app.todos, 'all', this.render);

      this.listenTo(app.todos, 'change:completed', this.filterOne);
      this.listenTo(app.todos, 'filter', this.filterAll);
      
      app.todos.fetch({reset: true});

    },
    render: function() {
      if (app.todos.length) {
        this.$('.todos-filter, .todos-list, .todos-stat').show()

        this.$('.remaining').html(app.todos.remaining().length)
        this.$('.todos-filter a').removeClass('selected').filter('[href="#/' + app.filter + '"]').addClass('selected')
      } else {
        this.$('.todos-filter, .todos-list, .todos-stat').hide()
      }
    },
    create: function(e) {
      if (e.keyCode == 13) {
        var title = this.$('#todo-new')[0].value
        if (title !== '') {
          var todo = new app.Todo({title: title})
          if (todo.isValid()) {
            app.todos.create(todo)
          }
          this.$('#todo-new')[0].value = ''
        }
      }
    },
    addOne: function(todo) {
      var todoView = new app.TodoView({model: todo})
      this.$list.append(todoView.render().el)
    },
    addAll: function() {
      this.$list.html('')
      app.todos.each(this.addOne, this)
    },
    clear: function() {
      _.invoke(app.todos.completed(), 'destroy')
      return false
    }, 
    filterOne: function(todo) {
      todo.trigger('visible')

    },
    filterAll: function() {
      app.todos.each(this.filterOne, this)
    }
  });

  app.AppView = AppView;
}())