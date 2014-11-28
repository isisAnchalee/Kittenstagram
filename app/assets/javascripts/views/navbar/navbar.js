Kittenstagram.Views.Navbar = Backbone.View.extend({
  template: JST['navbar/navbar'],

  initialize:function(){
  	this.listenTo(this.model, 'sync', this.render)
  },
  render: function(){
  	var renderedContent = this.template({
  		user: this.model
  	});
  	console.log("rendering");

  	this.$el.html(renderedContent);
  	return this;
  }

});
