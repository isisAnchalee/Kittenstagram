Kittenstagram.Collections.Photos = Backbone.Collection.extend({
	url: 'api/photos',
  model: Kittenstagram.Models.Photo,

	getOrFetch: function (id) {
	  var photo = this.get(id),
	    photos = this;
	  if(!photo) {
	    photo = new Kittenstagram.Models.photo({ id: id });
	    photo.fetch({
	      success: function () {
	        photos.add(photo);
	      },
	    });
	  } else {
	    photo.fetch();
	  }
	  return photo;
	}

});
Kittenstagram.userPhotos = new Kittenstagram.Collections.Photos();
Kittenstagram.feedPhotos = new Kittenstagram.Collections.Photos();
Kittenstagram.feedPhotos.url = "api/feeds";