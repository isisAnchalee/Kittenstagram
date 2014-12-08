Kittenstagram.Views.PhotosIndex = Backbone.CompositeView.extend({
  template: JST['photos/index'],

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addImageView)
    this.collection.each(this.addImageView.bind(this));
  },

  render: function(){
  	var renderedContent = this.template({
  		photos: Kittenstagram.Collections.photos
  	});
  	$('body').css('background-color','#edeeef')
  	this.$el.html(renderedContent);
    this.attachSubviews();
    setTimeout(function(){
      $('.redirect-user').css('visibility', 'visible')
    }, 1000)
  	return this;
  },

  addImageView: function(entry){
    var newImageSubView = new Kittenstagram.Views.PhotoShow({
      model: entry
    });
    this.addSubview(".photo-feed", newImageSubView);
  }
  
});
