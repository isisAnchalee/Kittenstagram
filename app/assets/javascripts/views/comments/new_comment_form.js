Kittenstagram.Views.CommentForm = Backbone.View.extend({
  template: JST['comments/new'],

  events:{
  "click form.new-comment": "createNewComment"
  },

  render: function(){
  	var renderedContent = this.template({
  		photo: this.model
  	});
  	this.delegateEvents();
  	this.$el.html(renderedContent);
  	return this;
  },

  createNewComment: function(event){
  	event.preventDefault();
  	comsole.log("meow!!");
  }

});

