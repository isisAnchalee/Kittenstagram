Kittenstagram.Views.LikesView = Backbone.View.extend({
  template: JST['likes/index'],
  events:{ "click .fav-btn": "likePhoto",
	},
  render: function(){
  	var renderedContent = this.template({
  		collection: this.collection
  	});

  	this.$el.html(renderedContent);
  	return this;
  },

  likePhoto: function(event){
  	event.preventDefault();
  	var $currentTarget = $(event.currentTarget);
  	debugger;

  }

});
