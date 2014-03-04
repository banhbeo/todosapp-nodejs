define([
  'lib/backbone',
  'env'
], function (Backbone, ENV) {

  var TodoView = Backbone.View.extend({
    events: {
      'click .check': 'complete',
      'dblclick .content': 'edit',
      'blur .content-edit': 'close',
      'keypress .content-edit': 'update',
      'click .delete': 'delete'
    },
    tagName: 'li',
    className: 'todo',
    template: _.template($('#todo-template').html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('completed', this.model.get('completed'));
      return this;
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'visible', this.toggleVisible);
    },
    edit: function() {
      this.$el.addClass('editing');
      this.$('.content-edit').focus();
    },
    close: function() {
      this.$el.removeClass('editing');
    },
    update: function(e) {
      if (e.keyCode == 13) {
        var title = this.$('.content-edit')[0].value;
        if (title !== '') {
          this.model.save({title: title}, {patch: true})
          this.close();
        }
      }
    },
    delete: function() {
      this.model.destroy();
      return false;
    },
    complete: function() {
      this.model.toggle();
    },
    isHidden: function() {
      var completed = this.model.get('completed')
      return ((!completed && ENV.filter == 'completed') || (completed && ENV.filter == 'active'));
    },
    toggleVisible: function() {
      this.$el.toggleClass('hidden', this.isHidden());
    }
  });

  return TodoView;
})
