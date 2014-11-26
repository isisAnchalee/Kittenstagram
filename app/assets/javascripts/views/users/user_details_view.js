Kittenstagram.Views.UserDetailsView = Backbone.View.extend({
  template: JST['users/profile_details'],

  render: function(){
  	var renderedContent = this.template({
  		user: this.model
  	});

  	this.$el.html(renderedContent);
  	return this;
  },
  
});