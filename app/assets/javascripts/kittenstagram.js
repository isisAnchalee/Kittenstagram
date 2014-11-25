window.Kittenstagram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    Kittenstagram.photos = new Kittenstagram.Collections.Photos();

    Kittenstagram.photos.fetch();

    new Kittenstagram.Routers.AppRouter({
      $rootEl: $('#main-page'),
      collection: Kittenstagram.photos
    });
    
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Kittenstagram.initialize();
});
