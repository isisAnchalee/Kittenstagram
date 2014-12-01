Kittenstagram.Views.LikesView = Backbone.View.extend({
  template: JST['likes/index'],
  
  initialize: function(){
    this.listenTo(this.collection, "add remove", this.render);
  },

  render: function(){
  	var renderedContent = this.template({
      photo: this.model,
  		collection: this.collection
  	});

  	this.$el.html(renderedContent);
  	return this;
  }

});
