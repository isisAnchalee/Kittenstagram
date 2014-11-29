Kittenstagram.Views.LikesView = Backbone.View.extend({
  template: JST['likes/index'],

  
  render: function(){
  	var renderedContent = this.template({
  		collection: this.collection
  	});

  	this.$el.html(renderedContent);
  	return this;
  }



});
