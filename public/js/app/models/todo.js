define(['lib/backbone'], function (Backbone) {

  var Todo = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false
    },
    idAttribute: '_id',
    toggle: function() {
      if (this.get('completed'))
        this.save('completed', false);
      else
        this.save('completed', true);
    },
    validate: function(attrs) {
      if (!attrs.title) {
        return "Please provide the title!";
      }
    }
  });

  return Todo;

})


