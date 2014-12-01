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
    $currentTarget.toggleClass("unfollow-btn");
    $(".ui-button-text").text("Unfollow");
  },

  unfollowUser: function(event){
  	event.preventDefault();
  	this.model.follow().destroy();
    var $currentTarget = $(event.currentTarget);
    $currentTarget.toggleClass("unfollow-btn");
    $currentTarget.toggleClass("follow-btn");
    $(".ui-button-text").text("Follow");
  }
  
});
