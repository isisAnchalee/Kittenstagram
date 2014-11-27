Kittenstagram.Views.CommentForm = Backbone.View.extend({
  template: JST['comments/new'],

  render: function(){
  	var renderedContent = this.template({
  		photo: this.model
  	});

  	this.$el.html(renderedContent);
  	return this;
  }

});

