Kittenstagram.Views.CommentShow = Backbone.View.extend({
  template: JST['comments/show'],

  render: function(){
  	var renderedContent = this.template({
  		comment: this.model
  	});

  	this.$el.html(renderedContent);
  	return this;
  }

});
