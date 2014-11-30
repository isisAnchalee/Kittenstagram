Kittenstagram.Views.SingularPhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/singular_photo_show'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  events:{
    "click .fav-btn": "heartAnimation"
  },

  render: function(){
  	var renderedContent = this.template({
  		photo: this.model
  	});

  	this.$el.html(renderedContent);
    return this;
  }
  
});
