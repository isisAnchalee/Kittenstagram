Kittenstagram.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],
  className: 'photo-show',

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
    this.addUserView()
  },

  render: function(){
  	var renderedContent = this.template({
  		photo: this.model
  	});
  	
  	this.$el.html(renderedContent);
    this.attachSubviews();
  	return this;
  },

  addUserView: function(){
    var newUserPhotoView = new Kittenstagram.Views.UsersProfilePhotoView({
      model: this.model.user()
    });

    this.addSubview(".photo-author-photo", newUserPhotoView);
  }
});