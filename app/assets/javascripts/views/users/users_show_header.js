Kittenstagram.Views.UsersShowHeader = Backbone.CompositeView.extend({
  template: JST['users/gallery_header'],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
  	var renderedContent = this.template({
  		user: this.model,
  		photos: this.collection
  	});

  	this.$el.html(renderedContent);

  	return this;
  }


  
});
