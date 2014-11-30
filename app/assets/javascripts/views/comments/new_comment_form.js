Kittenstagram.Views.CommentForm = Backbone.CompositeView.extend({
  template: JST['comments/new'],
  
  render: function(){
  	var renderedContent = this.template({
  		photo: this.model
  	});

  	this.$el.html(renderedContent);
  	return this;
  }

});

