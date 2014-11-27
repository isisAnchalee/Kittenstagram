Kittenstagram.Views.GalleryView = Backbone.CompositeView.extend({
	className: "gallery-wrapper",
  template: JST['users/gallery_index'],

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.addPhotoShow)
    this.collection.each(this.addPhotoShow.bind(this))
  },

  render: function(){
  	this.$el.html(renderedContent);
     this.attachSubviews();
  	return this;
  },

  addPhotoShow: function(){
    //ADDING GALLERY COMPOSITE VIEW AND IMAGE SUBVEWS


    this.addSubview(".user-gallery", headerSubview);
  }
  
});