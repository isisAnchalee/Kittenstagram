Kittenstagram.Views.GalleryImageView = Backbone.View.extend({
  template: JST['users/gallery_image_view'],

  className: 'col-xs-3',

  render: function(){
  	var likes = this.model.likes();
  	var renderedContent = this.template({
  		photo: this.model,
  		likes: likes
  	});
  	this.$el.html(renderedContent);
  	return this;
  }

});

  