Kittenstagram.Views.PhotoDetails = Backbone.CompositeView.extend({
  template: JST['photos/photo_details'],

  initialize: function(){
    this.addLikesView();
    this.model.comments().each(this.addNewCommentView.bind(this));
    this.listenTo(this.model.comments(), "add", this.addNewCommentView);
    this.listenTo(this.model.comments(), "remove", this.removeComment);

  },

  events:{ 
    "click .fav-btn": "likePhoto",
    "submit .new-comment": "createNewComment"
  },

  addNewCommentView: function(comment){
    var newCommentView = new Kittenstagram.Views.CommentShow({
      model: comment,
      user: comment.user
    });

    this.addSubview(".photo-comments", newCommentView);
  },

  render: function(){
  	var renderedContent = this.template({});
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
    })
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
  }

});