Kittenstagram.Views.PhotoDetails = Backbone.CompositeView.extend({
  template: JST['photos/photo_details'],

  initialize: function(){
    this.addLikesView();
    this.model.comments().each(this.addNewCommentView.bind(this));
    this.listenTo(this.model.comments(), "add", this.addNewCommentView);
    this.listenTo(this.model.comments(), "remove", this.removeComment);
  },

  events:{ 
    "click .like-btn": "likePhoto",
    "submit .new-comment": "createNewComment",
    "click #delete-photo-btn" : "deletePhoto",
    "click #profile-photo-btn": "setProfilePhoto"
  },

  addNewCommentView: function(comment){
    var newCommentView = new Kittenstagram.Views.CommentShow({
      model: comment,
      user: comment.user
    });

    this.addSubview(".photo-comments", newCommentView);
  },

  render: function(){
  	var renderedContent = this.template({
      photo: this.model
    });

  	this.$el.html(renderedContent);
    this.attachSubviews();
  	return this;
  },

  removeComment: function(comment){
    var commentSubview = _(this.subviews()['.photo-comments']).find(function(subview){
      return subview.model === comment;
    });

    this.removeSubview(".photo-comments", commentSubview);
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

    var $likeBtn = $(event.currentTarget);
      $likeBtn.attr("disabled", "disabled");

      setTimeout(function(){
        $likeBtn.removeAttr("disabled");
      }, 300);

    this.model.toggleLike(function(){
      $likeBtn.children().first().toggleClass('red')
    }.bind(this))
  },

  setProfilePhoto: function(event){
    event.preventDefault();
    var user = new Kittenstagram.Models.User({id: this.model.get("user_id")});
    user.set("profile_photo", this.model.get("url"));

    user.save({},{
      success: function(){
        Backbone.history.navigate("#users/" + CURRENT_USER_ID, { trigger: true });
      }
    });
  },
  
  deletePhoto: function(event){
    event.preventDefault;
    this.model.destroy();
    Backbone.history.navigate("#", { trigger: true })
  },

  

});