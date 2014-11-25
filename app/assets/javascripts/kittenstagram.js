window.Kittenstagram = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	var $main = $('.main-page'); 
    Kittenstagram.photos = new Kittenstagram.Collections.Photos();
    Kittenstagram.photos.fetch();
    new Kittenstagram.Routers.AppRouter({
      $rootEl: $main,
      collection: Kittenstagram.photos
    });
    Backbone.history.navigate();
  }
};

$(document).ready(function(){
  Kittenstagram.initialize();
});
