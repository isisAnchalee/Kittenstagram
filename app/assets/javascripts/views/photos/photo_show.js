Kittenstagram.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],
  className: 'photo-show',
  
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function(){
  	var renderedContent = this.template({
  		photo: this.model
  	});
  	
  	this.$el.html(renderedContent);
  	return this;
  }
  
});