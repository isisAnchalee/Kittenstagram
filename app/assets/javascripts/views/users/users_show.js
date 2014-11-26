Kittenstagram.Views.UsersShow = Backbone.View.extend({
	className: "users-show",
  template: JST['users/show'],
  render: function(){
  	var renderedContent = this.template({
  		user: this.model,
  		photos: this.model.photos()
  	});
  	this.$el.html(renderedContent);
  	return this;
  }
  
});
