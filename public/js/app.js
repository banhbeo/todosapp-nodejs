require([
  'app/views/app-view',
  'app/routers/router'
], function (AppView, Router) {

  new Router;
  Backbone.history.start();
  new AppView;
})
