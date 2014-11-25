Kittenstagram.Views.PhotosIndex = Backbone.CompositeView.extend({
  template: JST['photos/index'],

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);

    this.collection.each(this.addImageView.bind(this))
  },

  render: function(){
  	var renderedContent = this.template({
  		photos: Kittenstagram.Collections.photos
  	});
  	
  	this.$el.html(renderedContent);
    this.attachSubviews();
  	return this;
  },

  addImageView: function(entry){
    var newImageSubView = new Kittenstagram.Views.PhotoShow({
      model: entry
    });
    this.addSubview(".photo-feed", newImageSubView)
  }
  
});
