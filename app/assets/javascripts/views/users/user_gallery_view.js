Kittenstagram.Views.GalleryView = Backbone.CompositeView.extend({
  template: JST['users/gallery_index'],

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.addPhotoShow)
    this.collection.each(this.addPhotoShow.bind(this))
  },

  render: function(){
    var renderedContent = this.template({
      photos: this.collection
    });
  	this.$el.html(renderedContent);
    this.attachSubviews();
  	return this;
  },

  addPhotoShow: function(photo){
    var galleryPhoto = new Kittenstagram.Views.GalleryImageView({
      model: photo
    });

    this.addSubview(".gallery-feed", galleryPhoto);
  }
  
});