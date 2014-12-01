Kittenstagram.Views.UserDetailsView = Backbone.View.extend({
  template: JST['users/profile_details'],

  events:{
  	"click button.follow-btn": "followUser",
  	"click button.unfollow-btn": "unfollowUser",
  },
  
  render: function(){
  	var renderedContent = this.template({
  		user: this.model
  	});

  	this.$el.html(renderedContent);
  	return this;
  },

  followUser: function(event){
  	event.preventDefault();
  	this.model.follow().save()
    var $currentTarget = $(event.currentTarget);
    $currentTarget.toggleClass("follow-btn");
    console.log($currentTarget);

  },

  unfollowUser: function(event){
  	event.preventDefault();
  	this.model.follow().destroy();

  }
  
});
