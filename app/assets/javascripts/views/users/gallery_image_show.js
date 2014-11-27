Kittenstagram.Views.GalleryImageView = Backbone.View.extend({
  template: JST['users/gallery_image_view'],

  render: function(){
  	var renderedContent = this.template({
  		user: this.model
  	});

  	this.$el.html(renderedContent);
  	return this;
  }

});

  