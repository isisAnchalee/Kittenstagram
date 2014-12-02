Kittenstagram.Views.SingularPhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/singular_photo_show'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "add", this.addNewCommentView);
    this.listenTo(this.model.comments(), "remove", this.removeComment);
    this.model.comments().each(this.addNewCommentView.bind(this));
    this.addCommentFormView();
    this.addLikesView();
  },

  events:{
    "submit form" : "createNewComment",
    "click .fav-btn" : "likePhoto",
    "click .delete-photo-btn" : "deletePhoto",
    "click .profile-photo-btn": "setProfilePhoto"
  },

  addCommentFormView: function(){
    var newCommentForm = new Kittenstagram.Views.CommentForm({
      model: this.model
    });

    this.addSubview(".comment-form", newCommentForm);
  },

  addNewCommentView: function(comment){
    var newCommentView = new Kittenstagram.Views.CommentShow({
      model: comment,
      user: comment.user
    });

    this.addSubview(".photo-comments", newCommentView);
  },

  render: function(){
    var likers = this.model.get("likers");
  	var renderedContent = this.template({
  		photo: this.model,
      collection: this.collection,
      likers: likers
  	});

  	this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  createNewComment: function(event){
    event.preventDefault();
    var that = this;
    var $currentTarget = $(event.currentTarget);
    var attrs = $currentTarget.serializeJSON();
    var comment = new Kittenstagram.Models.Comment(attrs);
    comment.save({},{
      success: function(){
        that.model.comments().add(comment);
      }
    });
  },

  addLikesView: function(){
    var likes = this.model.likes();
    var likesSubview = new Kittenstagram.Views.LikesView({
      collection: likes,
      model: this.model
    });

    this.addSubview(".photo-likes", likesSubview);
  },

  likePhoto: function(event){
    event.preventDefault();
    this.model.toggleLike(function(){
      $(event.currentTarget).toggleClass('red');
    }.bind(this))
  },

  deletePhoto: function(event){
    event.preventDefault;
    this.model.destroy();
    Backbone.history.navigate("#", { trigger: true })
  },

  removeComment: function(comment){
    var commentSubview = _(this.subviews()['.photo-comments']).find(function(subview){
      return subview.model === comment;
    });

    this.removeSubview(".photo-comments", commentSubview);
  },

  setProfilePhoto: function(event){
    event.preventDefault();
    var user = new Kittenstagram.Models.User({id: this.model.get("user_id")});
    user.set("profile_photo", this.model.get("filepicker_url"));

    user.save({},{
      success: function(){
        Backbone.history.navigate("#users/" + CURRENT_USER_ID, { trigger: true });
      }
    });
  }
  
});
