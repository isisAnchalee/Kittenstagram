window.Kittenstagram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    new Kittenstagram.Routers.AppRouter({
      $rootEl: $('#main-page')
    });
    
    Backbone.history.start();
  }
};


