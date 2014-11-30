Kittenstagram.Views.CommentShow = Backbone.View.extend({
  template: JST['comments/show'],

  events:{
  	"click .delete-comment" : "deleteComment"
  },

  render: function(){
  	var renderedContent = this.template({
  		comment: this.model
  	});

  	this.$el.html(renderedContent);
  	return this;
  },

  deleteComment: function(event){
  	event.preventDefault();
  	this.model.destroy();
  }

});
