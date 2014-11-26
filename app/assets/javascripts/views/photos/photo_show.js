Kittenstagram.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],
  className: 'photo-show',

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model.comments(), 'sync', this.addCommentView)
    this.addUserView()

    // this.comments().each(this.addCommentView.bind(this));
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
  },

  addCommentView: function(){

  }
});