Kittenstagram.Views.PhotoDetails = Backbone.CompositeView.extend({
  template: JST['photos/photo_details'],

  initialize: function(){
    this.addLikesView();
    this.model.comments().each(this.addNewCommentView.bind(this));
  },

  render: function(){
  	var renderedContent = this.template({});
  	this.$el.html(renderedContent);
    this.attachSubviews();
  	return this;
  },

  addLikesView: function(){
    var likes = this.model.likes();
    var likesSubview = new Kittenstagram.Views.LikesView({
      collection: likes,
      photo: this.model
    });

    this.addSubview(".photo-likes", likesSubview);
  },

  addNewCommentView: function(comment){
    var newCommentView = new Kittenstagram.Views.CommentShow({
      model: comment
    });
    this.addSubview(".photo-comments", newCommentView);
  }

});