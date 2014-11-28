Kittenstagram.Views.NewPhoto = Backbone.CompositeView.extend({
  template: JST['photos/new_photo'],

  initialize: function(){
    
  },

  render: function(){
  	var renderedContent = this.template({});
  	this.$el.html(renderedContent);
  	return this;
  }

});