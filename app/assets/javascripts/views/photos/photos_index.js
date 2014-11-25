Kittenstagram.Views.PhotosIndex = Backbone.View.extend({
  template: JST['photos/index'],

  render: function(){
  	var renderedContent = this.template({
  		photos: Kittenstagram.Collections.photos
  	});
  	
  	this.$el.html(renderedContent);
  	return this;
  },

  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
  }

});
