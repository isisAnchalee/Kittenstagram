Kittenstagram.Views.GalleryImageView = Backbone.View.extend({
  template: JST['users/gallery_image_view'],
  className: 'col-xs-3',
  render: function(){
  	var renderedContent = this.template({
  		photo: this.model
  	});

  	this.$el.html(renderedContent);
  	return this;
  }

});

  