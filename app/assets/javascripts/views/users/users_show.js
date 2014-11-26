Kittenstagram.Views.UsersShow = Backbone.CompositeView.extend({
	className: "users-show",
  template: JST['users/show'],

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
  	var renderedContent = this.template({
  		user: this.model,
  		photos: this.model.photos()
  	});
    
  	this.$el.html(renderedContent);
  	return this;
  }
  
});
