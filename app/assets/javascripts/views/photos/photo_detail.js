Kittenstagram.Views.PhotoDetails = Backbone.CompositeView.extend({
  template: JST['photos/photo_details'],

  initialize: function(){
    this.addLikesView();
    this.model.comments().each(this.addNewCommentView.bind(this));
    this.listenTo(this.model.comments(), "add remove", this.attachSubviews)
    this.listenTo(this.model.likes(), "change", this.render)
  },

  events:{ 
  "click .fav-btn": "likePhoto",
  "submit .new-comment": "createNewComment"
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