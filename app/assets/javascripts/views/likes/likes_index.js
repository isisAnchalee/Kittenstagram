Kittenstagram.Views.LikesView = Backbone.View.extend({
  template: JST['likes/index'],
  
  initialize: function(){
    this.listenTo(this.collection, "change", this.render);
  },

  render: function(){
  	var renderedContent = this.template({
  		collection: this.collection
  	});

  	this.$el.html(renderedContent);
  	return this;
  }

});
