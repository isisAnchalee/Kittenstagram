Kittenstagram.Views.UserDetailsView = Backbone.View.extend({
  template: JST['users/profile_details'],
  events:{
  	"click button": "followUser"
  },
  render: function(){
  	var renderedContent = this.template({
  		user: this.model
  	});

  	this.$el.html(renderedContent);
  	return this;
  },

  followUser: function(event){
  	
  }
  
});