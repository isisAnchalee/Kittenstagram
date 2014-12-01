Kittenstagram.Views.SingularPhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/singular_photo_show'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "add", this.addNewCommentView);
    this.listenTo(this.model.comments(), "remove", this.removeComment);
    this.model.comments().each(this.addNewCommentView.bind(this));
  },

  events:{
    "submit .photo-page-comment-form" : "createNewComment",
    "click .fav-btn" : "likePhoto",
    "click .delete-photo-btn" : "deletePhoto"
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

  likePhoto: function(event){
    event.preventDefault();
    var that = this;
    var id = this.model.id;
    var $currentTarget = $(event.currentTarget);
    var like = new Kittenstagram.Models.Like();
    like.set("photo_id", id)

    like.save({}, {
      success:function(){
        console.log("meow!!")
        that.model.likes().add(like);
      }
    });
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
  }
  
});
